import styles from "./adminPanel.module.css";
import TableItem from "./tableItem";
import CreateCardPanel from "./createCardPanel";
import { useSelector } from "react-redux";
import { getCards, loadCardsList } from "../../store/cards";
import { getCardsSlides } from "../../store/cardsSlides";
import { useDispatch } from "react-redux";

const AdminPanel = () => {
  const dispatch = useDispatch();
  let cards = useSelector(getCards());
  let cardsSlides = useSelector(getCardsSlides());

  const parentHandleChange = (e) => {
    dispatch(loadCardsList());
    cards = getCards();
    cardsSlides = getCardsSlides();
  };

  return (
    <>
      <section>
        <h2 className={styles.orderHeading}>Ассортимент магазина</h2>
        <CreateCardPanel createCard={parentHandleChange} />
      </section>
      {cards?.map((card) => {
        const matchingSlides = cardsSlides?.filter(
          (slide) => slide.cardId === card._id
        );

        return (
          <TableItem
            card={card}
            key={`${card._id}-${matchingSlides[0]?._id}`}
            slides={matchingSlides}
          />
        );
      })}
    </>
  );
};

export default AdminPanel;
