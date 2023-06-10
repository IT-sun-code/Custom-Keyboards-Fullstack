import httpService from "../httpService";
const CardsSlidesEndpoint = "cardSlides/";

const CardsSlidesService = {
  //Получение всех слайдов
  getAll: async () => {
    const { data } = await httpService.get(CardsSlidesEndpoint);
    return data;
  },
  //Создание слайдаов(АДМИН)
  create: async (images) => {
    const { data } = await httpService.post(CardsSlidesEndpoint, { images });
    return data;
  },
  //Удвление слайдов(АДМИН)
  deleteCardSlides: async (slideIds) => {
    const requests = slideIds.map((id) =>
      httpService.delete(CardsSlidesEndpoint + id)
    );
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  },
  //Редактирование слайдов(АДМИН)
  updateCardSlide: async (slideId, payload) => {
    const response = await httpService.patch(
      CardsSlidesEndpoint + slideId,
      payload
    );
    return response.data;
  },
};
export default CardsSlidesService;
