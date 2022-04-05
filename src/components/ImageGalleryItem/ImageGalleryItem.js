import s from './ImageGalleryItem.module.css';
import { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    alt: PropTypes.string,
    largeImageUrl: PropTypes.string,
    src: PropTypes.string,
  };

  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { src, alt, largeImageUrl } = this.props;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={src}
          alt={alt}
          onClick={this.toggleModal}
          className={s['ImageGalleryItem-image']}
        />
        {isModalOpen && (
          <Modal onClose={this.toggleModal} src={largeImageUrl} alt={alt} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
