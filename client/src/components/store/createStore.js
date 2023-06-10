import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cards";
import cardsSlidesReducer from "./cardsSlides";
import basketReducer from "./basket";
import ordersReducer from "./orders";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cards: cardsReducer,
  cardsSlides: cardsSlidesReducer,
  orders: ordersReducer,
  basket: basketReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
