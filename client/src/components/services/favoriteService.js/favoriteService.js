import httpService from "../httpService";
import localStorageService from "../localStorageService";
const orderEndpoint = "user/";

const FavoriteService = {
  //Получение избранных товаров
  getAll: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(orderEndpoint + "favorites", {
      params: { userId },
    });
    return data;
  },
  //Добавление либо удаление из избранных
  changeStatus: async (item) => {
    const { data } = await httpService.patch(orderEndpoint + item._id);
    return data;
  },
};

export default FavoriteService;
