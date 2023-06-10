import { Link } from "react-router-dom";
import TextBlock from "../textBlock";
import Button from "../button";
import styles from "./basketItem.module.css";
import BasketItemData from "./basketItemData";
import PropTypes from "prop-types";
import { removeBasketItem } from "../../store/basket";
import { useDispatch } from "react-redux";

const BasketItem = ({ currentPath, card }) => {
  const dispatch = useDispatch();
  const onClickRemove = () => {
    dispatch(removeBasketItem(card._id));
  };

  return (
    currentPath === "/basket" && (
      <section>
        <div className={styles.order}>
          <div className={styles.info}>
            <div className={styles.itemBasket}>
              <Link to={`/cards/${card.itemId}`}>
                <img
                  className={`${styles.image} ${styles.imageBasket}`}
                  src={card.image}
                  alt="keyboard"
                />
              </Link>
            </div>
            <div className={styles.rightBlock}>
              <TextBlock {...card} />

              <div className={styles.data}>
                <BasketItemData card={card} />

                <div>
                  <Button appearance="ctvBlack" onClick={onClickRemove}>
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

BasketItem.propTypes = {
  currentPath: PropTypes.string,
  card: PropTypes.object,
};

export default BasketItem;
