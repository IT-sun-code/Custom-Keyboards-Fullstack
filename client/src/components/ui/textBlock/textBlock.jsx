import styles from "./textBlock.module.css";
import useModal from "../../utils/hooks/useModal";
import Modal from "../modal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const TextBlock = ({ title, subtitle, description, authData }) => {
  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();
  const { entities: orders } = useSelector((state) => state.orders);

  let status = "новичок";
  if (authData !== undefined && authData !== null)
    if (orders?.length > 0) status = "продвинутый";

  return !authData ? (
    <div className={styles.textBlock}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <p>{description}</p>
    </div>
  ) : (
    <>
      <div className={styles.textBlock}>
        <div className={styles.edit}>
          <h3>{authData.userName}</h3>
          <button onClick={() => handleModalOpen("editUser")}>
            <img src="/icons/actionIcons/edit.svg" alt="edit" />
          </button>
        </div>
        <p className={styles.subtitleAuth}>
          <b>Статус:</b> {status}
        </p>
        <p className={styles.subtitleAuth}>
          <b>Телефон:</b> {authData.phone}
        </p>
        <p className={styles.subtitleAuth}>
          <b>Почта:</b> {authData.email}
        </p>
        <p className={styles.subtitleAuth}>
          <b>Адрес:</b> {authData.address}
        </p>
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

TextBlock.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  authData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default TextBlock;
