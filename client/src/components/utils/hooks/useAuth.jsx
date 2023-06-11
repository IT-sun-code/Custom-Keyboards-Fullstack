import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Loading from "../../ui/loading";
import localStorageService from "../../services/localStorageService";
import UserService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import config from "../../../../config.json";

import { loadFavoritesList } from "../../store/favorites";
import { loadBasketList } from "../../store/basket";
import { loadOrdersList } from "../../store/orders";
import { loadCardsList } from "../../store/cards";
import { useDispatch } from "react-redux";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {
    key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  async function signUp({
    userName,
    phone,
    email,
    address,
    password,
    licence,
  }) {
    try {
      const { data } = await httpAuth.post("signUp", {
        userName,
        phone,
        email,
        address,
        password,
        licence,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует",
          };
          throw errorObject;
        }
      }
    }
  }

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post("signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Email или пароль введены некорректно");
          default:
            throw new Error("Слишком много попыток входа. Попробуйте позже");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);

    dispatch(loadFavoritesList());
    dispatch(loadBasketList());
    dispatch(loadOrdersList());

    dispatch(loadCardsList());
    navigate("/");
  }

  async function createUser(data) {
    try {
      const { content } = await UserService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await UserService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [isUserUpdated]);

  async function updateUserData(data) {
    try {
      const { content } = await UserService.updateCurrentUser(data);
      setUser(content);
      setIsUserUpdated(!isUserUpdated);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(() => {
    if (error !== null) {
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        currentUser,
        updateUserData,
      }}
    >
      {!isLoading ? children : <Loading />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AuthProvider;
