import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import PropTypes from "prop-types";
import config from "../../../../config.json";
import axios from "axios";

const FavoritesContext = React.createContext();
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
export const httpUser = axios.create({
  baseURL: config.apiEndpoint + "user/",
  params: {
    key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  },
});
export const FavoritesProvider = ({ children }) => {
  const { currentUser, updateUserData } = useAuth();
  const [favoriteCards, setFavoriteCards] = useState([]);

  const handleFavoriteClick = async (card) => {
    const favorites = currentUser?.favorites || [];
    const cardIndex = favorites.findIndex((favCard) => favCard == card._id);

    if (cardIndex === -1) {
      setFavoriteCards([card, ...favorites]);
      await updateUserData({
        ...currentUser,
        favorites: [card, ...favorites],
      });
    } else {
      const newFavoriteCards = [...favorites];
      newFavoriteCards.splice(cardIndex, 1);
      setFavoriteCards(newFavoriteCards);
      favorites.splice(cardIndex, 1);
      await updateUserData({
        ...currentUser,
        favorites: favorites,
      });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCards,
        handleFavoriteClick,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default FavoritesProvider;
