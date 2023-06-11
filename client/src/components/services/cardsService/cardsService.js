import httpService from "../httpService";
const cardsEndpoint = "cards/";

const CardsService = {
  //Получение всех товаров
  getAll: async () => {
    const { data } = await httpService.get(cardsEndpoint);
    return data;
  },
  //Получение товара с помощью Id
  getById: async (id) => {
    const { data } = await httpService.get(cardsEndpoint + id);
    return data;
  },
  //добавление товара(АДМИН)
  create: async (payload) => {
    const { data } = await httpService.post(cardsEndpoint, payload);
    return data;
  },
  //удаление товара(АДМИН)
  deleteCard: async (cardId) => {
    const { data } = await httpService.delete(cardsEndpoint + cardId);
    return data;
  },
  //редактирование товара(АДМИН)
  updateCard: async (cardId, payload) => {
    const { data } = await httpService.patch(cardsEndpoint + cardId, payload);
    return data;
  },
};

export default CardsService;
