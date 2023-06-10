import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardItem from "./cardItem";
import styles from "./cardPage.module.css";
import CardsSlidesService from "../../services/cardsSlidesService";
import CardsService from "../../services/cardsService";
import { useSelector } from "react-redux";
import { getCards } from "../../store/cards";

const CardPage = () => {
  const { id } = useParams();
  const cards = useSelector(getCards());
  const [card, setCard] = useState({});
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState([]);
  const [filteredSlides, setfilteredSlides] = useState([]);
  const navigate = useNavigate();
  const cardIndex = cards.findIndex((item) => item._id === card?._id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getCard = async () => {
      try {
        const cardData = await CardsService.getById(id);
        setCard(cardData);
      } catch (error) {
        errorCatcher(error);
      }
    };
    getCard();
  }, [id, cards]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { content } = await CardsSlidesService.getAll();
        setSlides(content);
      } catch (error) {
        errorCatcher(error);
      }
    };
    fetchData();
  }, [card]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      console.log(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    const filteredSlides = slides.filter((slide) => slide.cardId == card?._id);
    setfilteredSlides(filteredSlides);
  }, [slides, card?._id]);

  const handleNextClick = () => {
    if (cardIndex + 1 === cards.length) {
      navigate(`/cards/${cards[0]._id}`);
    } else {
      const nextIndex = cardIndex + 1;
      navigate(`/cards/${cards[nextIndex]._id}`);
    }
  };

  const handlePrevClick = () => {
    if (cardIndex - 1 === -1) {
      navigate(`/cards/${cards[cards.length - 1]._id}`);
    } else {
      const prevIndex = cardIndex - 1;
      navigate(`/cards/${cards[prevIndex]._id}`);
    }
  };

  return (
    <>
      <div className={styles.arrows}>
        <button onClick={handlePrevClick}>
          <img
            className={styles.left}
            src="/icons/actionIcons/arrowSort.svg"
            alt="arrowSlideLeft"
          />
        </button>
        <button onClick={handleNextClick}>
          <img
            className={styles.right}
            src="/icons/actionIcons/arrowSort.svg"
            alt="arrowSlideRight"
          />
        </button>
      </div>
      <CardItem slides={filteredSlides} card={card} />
    </>
  );
};

export default CardPage;
