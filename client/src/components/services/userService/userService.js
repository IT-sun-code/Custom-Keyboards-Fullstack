import httpService from "../httpService";
import localStorageService from "../localStorageService";

const userEndpoint = "user/";

const UserService = {
  //получение пользователя
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  //создание пользователя
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload.id, payload);
    return data;
  },
  //получение текущего пользователя
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },

  //update для изменения данных о пользователе
  updateCurrentUser: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};

export default UserService;
