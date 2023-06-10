import httpService from "../httpService";
import localStorageService from "../localStorageService";
const orderEndpoint = "order/";

const OrdersService = {
  //Получение всех заказов пользователя
  getAll: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(orderEndpoint, {
      params: { userId },
    });
    return data;
  },
  //изменение статуса доставки заказа
  changeOrder: async (orderId) => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.patch(orderEndpoint + orderId, {
      params: { userId },
    });
    return data;
  },
  //создвние заказа
  createOrder: async (orderData) => {
    const { deliveryDate, currentDate } = orderData;
    const userId = localStorageService.getUserId();
    const { data } = await httpService.post(orderEndpoint + "checkout/", {
      deliveryDate,
      currentDate,
      userId,
    });
    return data;
  },
};

export default OrdersService;
