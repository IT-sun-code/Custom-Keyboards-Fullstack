import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardItem from "./cardItem";
import styles from "./cardPage.module.css";

import CardsService from "../../services/cardsService";


const CardPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState([]);
 



  useEffect(() => {
    const getCard = async () => {
      try {
        const cardData = await CardsService.getById(id);
        setCard(cardData.content);
        setSlides(cardData.content.slides)
 
      } catch (error) {
        errorCatcher(error);
      }
    };
    getCard();
    window.scrollTo(0, 0);
  }, []);

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





  return (
    <>
      <CardItem slides={slides} card={card} />
    </>
  );
};

export default CardPage;
