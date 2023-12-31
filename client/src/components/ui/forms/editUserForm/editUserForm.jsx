import { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../textField";
import Button from "../../button";
import { useAuth } from "../../../utils/hooks/useAuth";
import PropTypes from "prop-types";

const EditUserForm = ({ onClose }) => {
  const { updateUserData, currentUser } = useAuth();
  const [data, setData] = useState({
    userName: currentUser.userName,
    phone: currentUser.phone,
    address: currentUser.address,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    userName: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      isName: {
        message: "Имя должно содержать только буквы",
      },
    },
    phone: {
      isRequired: {
        message: "Телефон обязателен для заполнения",
      },
      isPhone: {
        message: "Телефон введен некорректно",
      },
    },
    address: {
      isRequired: {
        message: "Адрес доставки обязателен для заполнения",
      },
      isAddress: {
        message: "Пример адреса: г.Санкт-Петербург, ул.Победы, д.2, кв.35",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await updateUserData(data);
      onClose();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="userName"
        value={data.userName}
        onChange={handleChange}
        error={errors.userName}
        autoComplete="current-name"
        autoFocus
      />
      <TextField
        label="Телефон"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        error={errors.phone}
        autoComplete="current-phone"
      />
      <TextField
        label="Адрес доставки"
        name="address"
        value={data.address}
        onChange={handleChange}
        error={errors.address}
        autoComplete="current-address"
      />
      <div>
        <Button appearance="ctvBlueSubmit" type="submit" disabled={isValid}>
          Подтвердить
        </Button>
      </div>
    </form>
  );
};

EditUserForm.propTypes = {
  onClose: PropTypes.func,
};
export default EditUserForm;
