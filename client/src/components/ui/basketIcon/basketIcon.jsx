import styles from "./basketIcon.module.css";
import PropTypes from "prop-types";

const BasketIcon = ({ onClick, cardItem }) => {
  return (
    <button onClick={onClick}>
      <img
        className={cardItem ? styles.basketCardItem : styles.basket}
        src={"/icons/actionIcons/basket.svg"}
        alt="basket"
      />
    </button>
  );
};

BasketIcon.propTypes = {
  onClick: PropTypes.func,
  cardItem: PropTypes.bool,
};
export default BasketIcon;
