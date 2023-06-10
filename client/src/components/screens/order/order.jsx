import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Card from "../home/card";
import styles from "./order.module.css";
import Button from "../../ui/button";
import Modal from "../../ui/modal";
import useModal from "../../utils/hooks/useModal";
import PropTypes from "prop-types";
import { changeStatus } from "../../store/orders";
import { useDispatch } from "react-redux";

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const [isDelivered, setIsDelivered] = useState(false);
  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();
  useEffect(() => {
    setIsDelivered(order.isDelivered);
  }, []);

  const handleDelivered = () => {
    dispatch(changeStatus(order._id));
    setIsDelivered(true);
  };

  return (
    <>
      <section className={styles.orderDate}>
        <div className={styles.data}>
          <div>
            <p className={styles.orderDate}>{order.orderDate}</p>
            <p className={styles.orderDate}>{order.orderAddress}</p>
          </div>
          <div>
            <Button
              isDelivered={isDelivered}
              disabled={!isDelivered}
              appearance={"ctvBlueSubmit"}
              onClick={() => handleModalOpen("delivery")}
            >
              {isDelivered ? "Получено" : "В доставке"}
            </Button>
          </div>
        </div>
        {order.items.map((item) => (
          <Card card={item} key={`${item._id}_${nanoid()}`} />
        ))}
      </section>
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onHandleDelivered={handleDelivered}
        />
      )}
    </>
  );
};

Order.propTypes = {
  order: PropTypes.object,
};
export default Order;
