import httpService from "../httpService";
const keyboardSliderEndpoint = "mainSlides/";

const KeyboardSliderService = {
  getAll: async () => {
    const { data } = await httpService.get(keyboardSliderEndpoint);
    return data;
  },
};
export default KeyboardSliderService;
