import styles from "./orderItemData.module.css";
import PropTypes from "prop-types";

const OrderItemData = ({ card }) => {
  const totalPrice = card.quantity * card.price;

  return (
    <div className={styles.data}>
      <div>
        <div className={styles.price}>
          <h3 className={styles.count}>{` ${card.quantity} шт.`}</h3>
        </div>
        <h3 className={styles.text}>{`Цена за 1 шт: ${card.price} руб.`}</h3>
        <h3 className={styles.text}>{`Всего: ${totalPrice} руб.`}</h3>
      </div>
    </div>
  );
};

OrderItemData.propTypes = {
  card: PropTypes.object,
};
export default OrderItemData;
