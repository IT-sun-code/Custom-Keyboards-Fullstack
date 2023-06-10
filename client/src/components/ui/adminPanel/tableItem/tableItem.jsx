import styles from "./tableItem.module.css";
import useModal from "../../../utils/hooks/useModal";
import Modal from "../../modal";
import PropTypes from "prop-types";

const TableItem = ({ card, slides }) => {
  const getSlideIdsByCardId = (slides) => {
    const slideIds = slides.map((slide) => slide.id);
    return slideIds;
  };
  const slidesIds = getSlideIdsByCardId(slides);

  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();

  const editData = {
    cardId: card._id,
    onClose: handleModalClose,
    slides: slides,
  };

  const deleteData = {
    cardId: card._id,
    slidesIds: slidesIds,
    onClose: handleModalClose,
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.itemsTable}>
          <div className={styles.itemId}>{card._id}</div>
          <div className={styles.items}>
            <div className={styles.item}>{card.title}</div>
            <div className={styles.item}>{card.category}</div>
            <div className={styles.item}>{card.price}</div>
            <div className={styles.item}>{card.image}</div>
            <div className={styles.item}>{card.description}</div>
            <div className={styles.cardSlidesInTable}>
              {card.slides.join(", ")}
            </div>
            <button onClick={() => handleModalOpen("editCard")}>
              <img
                src="/icons/actionIcons/edit.svg"
                alt="edit"
                className={styles.edit}
              />
            </button>
            <button onClick={() => handleModalOpen("deleteCard")}>
              <img
                src="/icons/actionIcons/delete.svg"
                alt="delete"
                className={styles.delete}
              />
            </button>
          </div>
        </div>
      </section>
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
          editData={editData}
          deleteData={deleteData}
        />
      )}
    </>
  );
};

TableItem.propTypes = {
  slides: PropTypes.array,
  card: PropTypes.object,
};
export default TableItem;
