import { createAction, createSlice } from "@reduxjs/toolkit";
import OrdersService from "../services/ordersService";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    orderRequested: (state) => {
      state.isLoading = true;
    },
    orderReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    orderRecevedEmpty: (state) => {
      state.isLoading = false;
      state.entities = [];
    },
    orderRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderAdded: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});
const { reducer: ordersReducer, actions } = ordersSlice;
const {
  orderRequested,
  orderReceved,
  orderRequestFailed,
  orderRecevedEmpty,
  orderAdded,
} = actions;

const updateOrdersRequested = createAction("cards/updateOrdersRequested");

//получение заказов
export const loadOrdersList = () => async (dispatch) => {
  dispatch(orderRequested());
  try {
    const { content } = await OrdersService.getAll();
    if (content) {
      dispatch(orderReceved(content));
    } else {
      dispatch(orderRecevedEmpty());
    }
  } catch (error) {
    dispatch(orderRequestFailed(error.message));
    dispatch(orderRecevedEmpty());
  }
};

//создание заказа
export const createOrder = (orderData) => async (dispatch) => {
  dispatch(updateOrdersRequested());
  try {
    const { content } = await OrdersService.createOrder(orderData);
    if (content) {
      dispatch(orderAdded(content));
    } else {
      dispatch(orderRecevedEmpty());
    }
  } catch (error) {
    dispatch(orderRecevedEmpty());
    console.log(error);
  }
};
//изменение статуса доставки
export const changeStatus = (orderId) => async (dispatch) => {
  try {
    const { content } = await OrdersService.changeOrder(orderId);
    if (content) {
      dispatch(orderReceved(content));
    } else {
      dispatch(orderRecevedEmpty());
    }
  } catch (error) {
    console.log(error);
  }
};

export default ordersReducer;
