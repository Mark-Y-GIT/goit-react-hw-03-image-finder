import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23240141-7440ad27c2a7f631b6af362f8';

const pixabayFetchData = (query, currentPage) => {
  return fetch(
    `${BASE_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default pixabayFetchData;

pixabayFetchData.propTypes = {
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};
