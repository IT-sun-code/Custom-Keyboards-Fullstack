import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../screens/home";
import Page404 from "../../screens/page404";
import Constructor from "../../screens/constructor";
import AboutUs from "../../screens/aboutUs";
import CardPage from "../../screens/CardPage";
import Footer from "../../ui/footer";
import UserPage from "../../screens/userPage";
import Basket from "../../screens/basket";
import Favorites from "../../screens/favorites";
import Admin from "../../screens/admin";
import Header from "../../ui/header";
import ScrollToTop from "../scrollers/scrollToTop";
import AuthProvider, { useAuth } from "../hooks/useAuth";
import PrivateRoute from "./privateRoute";
import FavoritesProvider from "../hooks/useFavorites";

import OrdersProvider from "../hooks/useOrders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { loadCardsList } from "../../store/cards";
import { loadCardsSlidesList } from "../../store/cardsSlides";
import { loadBasketList } from "../../store/basket";
import localStorageService from "../../services/localStorageService";
import { loadOrdersList } from "../../store/orders";
import { loadFavoritesList } from "../../store/favorites";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCardsList());
    dispatch(loadCardsSlidesList());
    dispatch(loadBasketList());
    dispatch(loadOrdersList());
    dispatch(loadFavoritesList());
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <ScrollToTop />
        <OrdersProvider>
          <FavoritesProvider>
            <Routes>
              <Route element={<Home />} path={"/"} />
              <Route element={<Constructor />} path={"/constructor"} />
              <Route element={<AboutUs />} path={"/aboutUs"} />
              <Route element={<Page404 />} path={"*"} />
              <Route element={<CardPage />} path={"/cards/:id"} />
              <Route
                path="/user"
                element={
                  <PrivateRoute>
                    <UserPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/basket"
                element={
                  <PrivateRoute>
                    <Basket />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
            </Routes>
          </FavoritesProvider>
        </OrdersProvider>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
