import { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../forms/textField";
import Button from "../../button";
import SelectField from "../../forms/selectField";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getCards, updateCard } from "../../../store/cards";

const CardEditForm = ({ cardId, onClose }) => {
  const dispatch = useDispatch();
  const cards = useSelector(getCards());
  //дефолтные занчение для карты товара
  const clearData = {
    title: "",
    category: "keyboard",
    price: "",
    image: "",
    description: "",
    slides:[]
  };
  //дефолтные значения для слайдов товара
  const clearSlide = {
    value: "",
    list: [],
  };

  const [data, setData] = useState(() => {
    const card = cards.find((card) => card._id === cardId);
    return card ? card : clearData;
  });

  const [slides, setSlides] = useState(() => {
    const card = cards.find((card) => card._id === cardId);
    return card ? { value: "", list: card.slides } : clearSlide;
  });

  const [errors, setErrors] = useState({});
  //изменения полей карты товара
  const handleChange = (target) => {
    const { name, value, type } = target;

    setData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  //добавление изменений карты товара
  const onUpdateItem = (target) => {
    const { name, value } = target;
    setSlides((slides) => {
      const list = slides.list.map((item, j) => {
        if (j === Number(name)) {
          return value;
        } else {
          return item;
        }
      });
      setData((prevState) => ({
        ...prevState,
        slides: list,
      }));
      return {
        list,
      };
    });
  };
  //изменение значений слайдов
  const onChangeValue = (target) => {
    setSlides((prevState) => ({
      ...prevState,
      value: target.value,
    }));
  };
  //добавление слайда
  const onAddItem = () => {
    setSlides((state) => {
      const list = state.list.concat(state.value);
      setData((prevState) => ({
        ...prevState,
        slides: list,
      }));
      return {
        list,
        value: "",
      };
    });
  };
  //удаление слайда
  const onRemoveItem = (i) => {
    setSlides((state) => {
      const list = state.list.filter((item, j) => i !== j);
      setData((prevState) => ({
        ...prevState,
        slides: list,
      }));
      return {
        list,
        value: "",
      };
    });
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

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  //добавление всех изменений
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      dispatch(updateCard(cardId, data));
      onClose();
    } catch (error) {
      setErrors(error);
    }
  };

  const categoriesList = [
    { label: "клавиатура", value: "keyboard" },
    { label: "клавиша", value: "keycap" },
    { label: "клавиши", value: "keycaps" },
  ];

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Название"
            name="title"
            value={data.title}
            placeholder="Mistel..."
            onChange={handleChange}
            error={errors.title}
            autoComplete="current-title"
            autoFocus
          />
          <SelectField
            label="Выберите категорию"
            options={categoriesList}
            name="category"
            onChange={handleChange}
            value={data.category}
            error={errors.category}
          />
          <TextField
            type="number"
            label="Цена"
            name="price"
            value={data.price}
            placeholder="1200"
            min="0"
            onChange={handleChange}
            error={errors.price}
            autoComplete="current-price"
          />
          <TextField
            label="Фото"
            name="image"
            value={data.image}
            placeholder="/images/1.jpg"
            onChange={handleChange}
            error={errors.image}
            autoComplete="current-image"
          />
          <TextField
            label="Описание"
            name="description"
            value={data.description}
            placeholder="Необыкновенная..."
            onChange={handleChange}
            error={errors.description}
            autoComplete="current-description"
          />
          {slides.list.map((_, index) => (
            <>
              <TextField
                key={index}
                label={`Слайд ${index + 1}`}
                name={index}
                value={slides.list[index]}
                error={errors.slides}
                placeholder={`Слайд ${index + 1}`}
                onChange={onUpdateItem}
                autoComplete={`current-image-${index}`}
              />
              <button onClick={() => onRemoveItem(index)}>
                <img
                  src="/icons/actionIcons/delete.svg"
                  alt="delete"
                  className="margin-left: 15px"
                />
              </button>
            </>
          ))}
          <TextField
            label="Новый слайд"
            name="newSlide"
            value={slides.value}
            error={errors.slides}
            placeholder="Новый слайд"
            onChange={onChangeValue}
            autoComplete="current-image-new"
          />
          <Button
            type="button"
            appearance="ctvBlueSubmit"
            onClick={onAddItem}
            disabled={true}
          >
            Добавить слайд
          </Button>
          <div>
            <Button appearance="ctvBlueSubmit" type="submit" disabled={isValid}>
              Подтвердить
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

CardEditForm.propTypes = {
  cardId: PropTypes.string,
  onClose: PropTypes.func,
};
export default CardEditForm;
