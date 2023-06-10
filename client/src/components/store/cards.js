import { createAction, createSlice } from "@reduxjs/toolkit";
import CardsService from "../services/cardsService";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    cardsRequested: (state) => {
      state.isLoading = true;
    },
    cardsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    cardsRecevedEmpty: (state) => {
      state.isLoading = false;
      state.entities = [];
    },
    cardsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    cardCreated: (state, action) => {
      state.entities = [action.payload, ...state.entities];
    },
    cardDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c.id !== action.payload);
    },
    cardUpdateSuccessed: (state, action) => {
      const cardId = action.payload.id;
      state.entities[state.entities.findIndex((c) => c.id === cardId)] =
        action.payload;
    },
  },
});

const { reducer: cardsReducer, actions } = cardsSlice;
const {
  cardsRequested,
  cardsReceved,
  cardsRequestFailed,
  cardCreated,
  cardDeleted,
  cardUpdateSuccessed,
} = actions;

const addCardRequested = createAction("cards/addCardRequested");
const deleteCardRequested = createAction("cards/deleteCardRequested");
const updateCardFailed = createAction("cards/updateCardFailed");
const updateCardRequested = createAction("cards/updateCardRequested");

//получение всех товаров
export const loadCardsList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
    dispatch(cardsRecevedEmpty());
  }
};
//создание товара(АДМИН)
export const createCard = (payload) => async (dispatch) => {
  dispatch(addCardRequested(payload));
  try {
    const { content } = await CardsService.create(payload);
    dispatch(cardCreated(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};
//удвление товара(АДМИН)
export const deleteCard = (cardId) => async (dispatch) => {
  dispatch(deleteCardRequested());
  try {
    const { content } = await CardsService.deleteCard(cardId);
    if (content === null) {
      dispatch(cardDeleted(cardId));
    }
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};
//редактирование товара(АДМИН)
export const updateCard = (cardId, payload) => async (dispatch) => {
  dispatch(updateCardRequested());
  try {
    const { content } = await CardsService.updateCard(cardId, payload);
    dispatch(cardUpdateSuccessed({ id: cardId, ...content }));
  } catch (error) {
    dispatch(updateCardFailed(error.message));
  }
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const getCards = () => (state) => state.cards.entities;
export const getCardsLoadingStatus = () => (state) => state.cards.isLoading;

export default cardsReducer;
