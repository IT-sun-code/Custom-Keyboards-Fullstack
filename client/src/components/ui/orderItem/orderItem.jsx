import { Link } from "react-router-dom";
import TextBlock from "../textBlock";
import styles from "./orderItem.module.css";
import OrderItemData from "./orderItemData";
import PropTypes from "prop-types";

const OrderItem = ({ currentPath, card }) => {
  return (
    currentPath === "/user" && (
      <>
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
                  <OrderItemData card={card} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

OrderItem.propTypes = {
  currentPath: PropTypes.string,
  card: PropTypes.object,
};
export default OrderItem;
