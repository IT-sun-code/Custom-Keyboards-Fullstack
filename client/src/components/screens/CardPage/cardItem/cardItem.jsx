import { useState, useEffect } from "react";
import styles from "./cardItem.module.css";
import Slider from "../../../ui/slider";
import Loading from "../../../ui/loading";
import HeartIcon from "../../../ui/heartIcon";
import BasketIcon from "../../../ui/basketIcon";
import { useFavorites } from "../../../utils/hooks/useFavorites";
import { useAuth } from "../../../utils/hooks/useAuth";
import Modal from "../../../ui/modal";
import useModal from "../../../utils/hooks/useModal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createBasket } from "../../../store/basket";
import { changeStatus } from "../../../store/favorites";

const CardItem = ({ slides, card }) => {
  const dispatch = useDispatch();
  const [filteredSlides, setfilteredSlides] = useState([]);
  const { currentUser } = useAuth();
  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();

  useEffect(() => {
    const filteredSlides = slides.filter((slide) => slide.cardId == card._id);
    setfilteredSlides(filteredSlides);
  }, [slides, card._id]);

  const { entities: favoriteCards } = useSelector((state) => state.favorites);
  const { handleFavoriteClick } = useFavorites();
  const isFavorite = favoriteCards.some((favCard) => favCard._id === card._id);
  const [heartIconclicks, setHeartIconClicks] = useState(isFavorite);

  const handleHeartIconClick = async () => {
    setHeartIconClicks(!heartIconclicks);
    dispatch(changeStatus(card));
    handleFavoriteClick(card);
  };

  const handleBasketIconClick = async () => {
    dispatch(createBasket(card._id));
  };

  return (
    <>
      <div className={styles.container}>
        {filteredSlides.length <= 0 ? (
          <div className={styles.slide}>
            <Loading />
          </div>
        ) : (
          <div className={styles.slide}>
            <Slider slides={filteredSlides} appearance={"percentagesLower"} />
          </div>
        )}

        <div className={styles.item}>
          <div className={styles.characteristics}>
            <h4 className={styles.title}>{card.title}</h4>
            <h4 className={styles.sku}>Артикул: {card._id}</h4>
            <p>
              <b>Описание: </b>
              {card.description}
            </p>
          </div>
          <div className={styles.actionBlock}>
            {!currentUser?.admin ? (
              <>
                <HeartIcon
                  onClick={
                    currentUser
                      ? handleHeartIconClick
                      : () => handleModalOpen("signIn")
                  }
                  isActive={isFavorite}
                  cardItem
                />
                <h2>Цена: {card.price} ₽</h2>
                <BasketIcon
                  onClick={
                    currentUser
                      ? handleBasketIconClick
                      : () => handleModalOpen("signIn")
                  }
                  cardItem
                />
              </>
            ) : (
              <h2 className={styles.price}>Цена: {card.price} ₽</h2>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

CardItem.propTypes = {
  slides: PropTypes.array,
  card: PropTypes.object,
};
export default CardItem;
