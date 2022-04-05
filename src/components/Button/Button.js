import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ loadMoreImages }) => {
  return (
    <div className={s.ButtonContainer}>
      <button
        type="button"
        className={s.Button}
        onClick={() => loadMoreImages()}
      >
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  loadMoreImages: PropTypes.func,
};
