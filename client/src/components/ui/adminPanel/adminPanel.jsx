import styles from "./adminPanel.module.css";
import TableItem from "./tableItem";
import CreateCardPanel from "./createCardPanel";
import { useSelector } from "react-redux";
import { getCards, loadCardsList } from "../../store/cards";

import { useDispatch } from "react-redux";

const AdminPanel = () => {
  const dispatch = useDispatch();
  let cards = useSelector(getCards());


  const parentHandleChange = (e) => {
    dispatch(loadCardsList());
    cards = getCards();

  };

  return (
    <>
      <section>
        <h2 className={styles.orderHeading}>Ассортимент магазина</h2>
        <CreateCardPanel createCard={parentHandleChange} />
      </section>
      {cards?.map((card) => {
     

        return (
          <TableItem
            card={card}
            key={`${card._id}-${card.slides[0]?._id}`}
            slides={card.slides}
          />
        );
      })}
    </>
  );
};

export default AdminPanel;
