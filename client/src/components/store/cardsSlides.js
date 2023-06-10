import { createAction, createSlice } from "@reduxjs/toolkit";
import CardsSlidesService from "../services/cardsSlidesService";

const cardsSlidesSlice = createSlice({
  name: "cardsSlides",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    cardsSlidesRequested: (state) => {
      state.isLoading = true;
    },
    cardsSlidesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    cardsSlidesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    cardsSlidesCreated: (state, action) => {
      state.entities = [action.payload, ...state.entities];
    },
    cardsSlidesDeleted: (state, action) => {
      const cardId = action.payload;
      state.entities = state.entities.filter(
        (slide) => slide.cardId !== cardId
      );
    },
    cardsSlidesUpdated: (state, action) => {
      const updatedSlides = action.payload;
      state.entities = state.entities.map((slide) => {
        const updatedSlide = updatedSlides.find(
          (updated) => updated.id === slide.id
        );
        if (updatedSlide) {
          return { ...slide, ...updatedSlide };
        }
        return slide;
      });
    },
  },
});

const { reducer: cardsSlidesReducer, actions } = cardsSlidesSlice;
const {
  cardsSlidesRequested,
  cardsSlidesReceved,
  cardsSlidesRequestFailed,
  cardsSlidesCreated,
  cardsSlidesDeleted,
  cardsSlidesUpdated,
} = actions;

const addCardsSlidesRequested = createAction("cards/addCardsSlidesRequested");
const deleteCardsSlidesRequested = createAction(
  "cards/deleteCardsSlidesRequested"
);
const updateCardsSlidesFailed = createAction("cards/updateCardsSlidesFailed");
const updateCardsSlidesRequested = createAction(
  "cards/updateCardsSlidesRequested"
);
//получение всех слайдов
export const loadCardsSlidesList = () => async (dispatch) => {
  dispatch(cardsSlidesRequested());
  try {
    const { content } = await CardsSlidesService.getAll();
    dispatch(cardsSlidesReceved(content));
  } catch (error) {
    dispatch(cardsSlidesRequestFailed(error.message));
  }
};
//создание слайдов(АДМИН)
export const createCardsSlides = (payload) => async (dispatch) => {
  dispatch(addCardsSlidesRequested(payload));
  try {
    const { content } = await CardsSlidesService.create(payload);
    dispatch(cardsSlidesCreated(content));
    dispatch(loadCardsSlidesList());
  } catch (error) {
    dispatch(cardsSlidesRequestFailed(error.message));
  }
};
//удаление слайдов(АДМИН)
export const deleteCardsSlides = (cardId, slidesIds) => async (dispatch) => {
  dispatch(deleteCardsSlidesRequested());
  try {
    const { content } = await CardsSlidesService.deleteCardSlides(slidesIds);
    if (content !== null) {
      dispatch(cardsSlidesDeleted(cardId));
    }
  } catch (error) {
    dispatch(cardsSlidesRequestFailed(error.message));
  }
};
//редактирование слайдов(АДМИН)
export const updateCardsSlides = (payload) => async (dispatch) => {
  dispatch(updateCardsSlidesRequested());
  try {
    const updatedSlides = await Promise.all(
      payload.map(async (slide) => {
        const { id: slideId, ...slidePayload } = slide;
        return CardsSlidesService.updateCardSlide(slideId, slidePayload);
      })
    );
    dispatch(cardsSlidesUpdated(updatedSlides));
    dispatch(loadCardsSlidesList());
  } catch (error) {
    dispatch(updateCardsSlidesFailed(error.message));
  }
};

export const getCardsSlides = () => (state) => state.cardsSlides.entities;
export const getCardsSlidesLoadingStatus = () => (state) =>
  state.cardsSlides.isLoading;

export default cardsSlidesReducer;
