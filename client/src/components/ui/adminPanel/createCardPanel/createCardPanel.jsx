import { useState, useEffect } from "react";
import styles from "./createCardPanel.module.css";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createCard, loadCardsList } from "../../../store/cards";

const CreateCardPanel = (props) => {
  const dispatch = useDispatch();
  //дефолтные значения для слайда товра
  const clearSlide = {
    value: "",
    list: [],
  };
  //дефолтные значения для карты товара
  const clearData = {
    title: "",
    category: "keyboard",
    price: "",
    image: "",
    description: "",
    slides: [],
  };
  const [data, setData] = useState(clearData);
  const [slides, setSlides] = useState(clearSlide);
  const [errors, setErrors] = useState({});

  //изменения поля карты товара
  const handleChange = (target) => {
    const { name, value, type } = target;
    setData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  //изменение слайда товара
  const onChangeValue = (target) => {
    setSlides((prevState) => ({
      ...prevState,
      value: target.value,
      slides: [target.value],
    }));

    onAddItem(target);
  };

  const validatorConfig = {
    title: {
      isRequired: {
        message: "Oбязательно",
      },
    },
    category: {
      isRequired: {
        message: "Oбязательно",
      },
    },
    price: {
      isRequired: {
        message: "Oбязательно",
      },
    },
    image: {
      isRequired: {
        message: "Oбязательно",
      },
    },
    description: {
      isRequired: {
        message: "Oбязательно",
      },
    },
  };

  const validatorSlide = {
    value: {
      isRequired: {
        message: "Oбязательно",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  //валидация карты товара
  const validate = () => {
    const slidesErrors = validator(slides, validatorSlide);
    let dataErrors = validator(data, validatorConfig);
    let errors = {};

    if (slidesErrors.value !== undefined) {
      errors = {
        ...dataErrors,
        value: slidesErrors.value,
      };
    } else if (dataErrors.keys !== null) {
      errors = dataErrors;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const clearForm = () => {
    setData(clearData);
  };
  const clearFormSlide = () => {
    setSlides(clearSlide);
  };

  const handleSubmit = (e) => {
    const isValid = validate();
    if (!isValid) return;

    dispatch(createCard(data));
    props.createCard();
    e.preventDefault();
    dispatch(loadCardsList());

    try {
      clearForm();
      clearFormSlide();
    } catch (error) {
      setErrors(error);
    }
  };

  const onAddItem = (target) => {
    try {
      setSlides((state) => {
        state.list = [];
        const list = state.list.concat(target.value);
        setData((prevState) => ({
          ...prevState,
          slides: list,
        }));
        return {
          list,
          value: target.value,
        };
      });
    } catch (error) {
      setErrors(error);
    }
  };

  const getInputClasses = (error) => {
    return `${error ? styles.invalid : styles.valid}`;
  };

  return (
    <>
      <section>
        <div className={styles.panel}>
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={!isValid}
          >
            <img
              src="/icons/actionIcons/add.svg"
              alt="add"
              className={`${!isValid && styles.disabled}`}
            />
          </button>
          <div className={styles.theadBlock}>
            <div className={styles.thead}>
              <h4>Название</h4>
              <h4>Категория</h4>
              <h4>Цена</h4>
              <h4>Фото</h4>
              <h4>Описание</h4>
              <h4>Слайд</h4>
            </div>
            <div>
              <form onSubmit={handleSubmit} className={styles.thead}>
                <div className={styles.inline}>
                  <input
                    type="text"
                    name="title"
                    value={data.title}
                    placeholder="Mistel..."
                    error={errors.title}
                    onChange={(e) => handleChange(e.target)}
                    className={getInputClasses(errors.title)}
                  />
                  {errors.title && (
                    <div className={styles.errorMessage}>{errors.title}</div>
                  )}
                </div>
                <div className={styles.inline}>
                  <select
                    value={data.category}
                    name="category"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.category}
                    className={getInputClasses(errors.category)}
                  >
                    <option value="keyboard">клавиатура</option>
                    <option value="keycap">клавиша</option>
                    <option value="keycaps">клавиши</option>
                  </select>
                  {errors.category && (
                    <div className={styles.errorMessage}>{errors.category}</div>
                  )}
                </div>
                <div className={styles.inline}>
                  <input
                    type="number"
                    value={data.price}
                    name="price"
                    placeholder="1200"
                    min="0"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.price}
                    className={getInputClasses(errors.price)}
                  />
                  {errors.price && (
                    <div className={styles.errorMessage}>{errors.price}</div>
                  )}
                </div>
                <div className={styles.inline}>
                  <input
                    type="text"
                    value={data.image}
                    name="image"
                    placeholder="/images/1.jpg"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.image}
                    className={getInputClasses(errors.image)}
                  />
                  {errors.image && (
                    <div className={styles.errorMessage}>{errors.image}</div>
                  )}
                </div>
                <div className={styles.inline}>
                  <input
                    type="text"
                    value={data.description}
                    name="description"
                    placeholder="Клавиатура..."
                    onChange={(e) => handleChange(e.target)}
                    error={errors.description}
                    className={getInputClasses(errors.description)}
                  />
                  {errors.description && (
                    <div className={styles.errorMessage}>
                      {errors.description}
                    </div>
                  )}
                </div>
                <div className={styles.inline}>
                  <input
                    type="text"
                    value={slides.value}
                    name="value"
                    placeholder="Слайд1.jpg"
                    onChange={(e) => onChangeValue(e.target)}
                    error={errors.value}
                    className={`${styles.cardSlides} ${getInputClasses(
                      errors.value
                    )}`}
                  />
                  {errors.value && (
                    <div className={styles.errorMessage}>{errors.value}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

CreateCardPanel.propTypes = {
  props: PropTypes.object,
};
export default CreateCardPanel;
