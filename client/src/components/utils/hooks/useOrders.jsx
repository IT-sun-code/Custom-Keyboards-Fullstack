import React, { useContext } from "react";
import {
  calculateCurrentDate,
  calculateDeliveryDate,
} from "../calculateDeliveryDate";
import PropTypes from "prop-types";
import config from "../../../../config.json";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createOrder } from "../../store/orders";
import { loadBasketList } from "../../store/basket";

const OrdersContext = React.createContext();
export const useOrders = () => {
  return useContext(OrdersContext);
};
export const httpOrder = axios.create({
  baseURL: config.apiEndpoint + "order/",
  params: {
    key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  },
});

export const OrdersProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentDate = calculateCurrentDate();
  const deliveryDate = calculateDeliveryDate();

  //Создание заказа
  const handleOrdersClick = async (orderData) => {
    try {
      await dispatch(createOrder({ currentDate, deliveryDate }));
      await dispatch(loadBasketList());
    } catch (error) {
      console.log("Ошибка создания заказа", error);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        handleOrdersClick,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

OrdersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default OrdersProvider;
