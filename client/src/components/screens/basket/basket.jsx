import Heading from "../../ui/heading";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";
import Line from "../../ui/line";
import Button from "../../ui/button";
import styles from "./basket.module.css";
import { useAuth } from "../../utils/hooks/useAuth";
import Card from "../home/card";
import useModal from "../../utils/hooks/useModal";
import Modal from "../../ui/modal";
import { useOrders } from "../../utils/hooks/useOrders";
import { useSelector } from "react-redux";

const Basket = () => {
  const {
    entities: basketCards,
    totalPrice,
    totalQuantity,
  } = useSelector((state) => state.basket);
  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();
  const { handleOrdersClick } = useOrders();
  const { currentUser } = useAuth();

  const orderData = {
    basketCards: basketCards,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
    address: currentUser.address,
    handleOrdersClick: handleOrdersClick,
  };

  return (
    <>
      <Heading>
        <FirstHeading>ВАША КОРЗИНА</FirstHeading>
        {basketCards?.length === 0 && (
          <SecondHeading>Здесь пока пусто</SecondHeading>
        )}
      </Heading>
      {basketCards?.length !== 0 && (
        <>
          <section>
            {basketCards?.map((basket, index) => (
              <Card card={basket} key={index} />
            ))}
          </section>
          <Line />
          <section>
            <h2>{`Товаров: ${totalQuantity}  шт.`}</h2>
            <h2 className={styles.total}>{`ИТОГО: ${totalPrice} руб.`}</h2>
            <Button
              appearance="ctvBlueOrder"
              onClick={() => handleModalOpen("order")}
            >
              Оформить заказ
            </Button>
          </section>
        </>
      )}
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
          orderData={orderData}
        />
      )}
    </>
  );
};

export default Basket;
