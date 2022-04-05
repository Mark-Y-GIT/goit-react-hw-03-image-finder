import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pixabayFetchData from 'services/api/pixabayApi';
import ImageGallery from 'components/ImageGallery';
import BootAnimation from './components/BootAnimation';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import s from './App.module.css';

class App extends Component {
  state = {
    pictureName: '',
    pictureData: [],
    pictureRequestPage: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pictureName !== this.state.pictureName) {
      this.setState({
        pictureData: [],
        pictureRequestPage: 1,
        error: null,
        status: 'pending',
      });
      this.fetchPicture();
    }
  }

  getPictureName = inputValue => {
    this.setState({ pictureName: inputValue });
  };

  fetchPicture = () => {
    const { pictureName, pictureRequestPage } = this.state;

    pixabayFetchData(pictureName, pictureRequestPage)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Unsuccessful request'));
      })
      .then(data => data.hits)
      .then(data => {
        this.setState(prevState => ({
          pictureData: [...prevState.pictureData, ...data],
          pictureRequestPage: ++prevState.pictureRequestPage,
        }));
      })
      .then(() => {
        if (this.state.pictureData.length) {
          this.setState({ status: 'resolved' });
        } else {
          this.setState({
            error: `No data on request ${this.state.pictureName}`,
            status: 'rejected',
          });
        }
      })
      .then(() => this.smoothScrolling())
      .catch(error => {
        this.setState({ status: 'rejected', error: error.message });
      });
  };

  smoothScrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, pictureData, error } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getPictureName} />
        {status === 'rejected' && <h1 className={s.Error}>{error}</h1>}
        <ImageGallery images={pictureData} />
        {status === 'pending' && <BootAnimation />}
        {status === 'resolved' && <Button loadMoreImages={this.fetchPicture} />}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
