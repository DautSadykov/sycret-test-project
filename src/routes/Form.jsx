import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL_LINK, API_KEY } from "../config.js"

function Form() {
  const methodName = "OSSale";
  const url = new URL(URL_LINK);
  url.searchParams.append("ApiKey", API_KEY);
  url.searchParams.append("MethodName", methodName);
  url.searchParams.append(
    "Id",
    useSelector((state) => state.certId.value)
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        errors.name = value.trim().length === 0 ? "Имя обязательно" : "";
        break;
      case "phone":
        errors.phone =
          !/^\d+$/.test(value) || value.length !== 11
            ? "Номер телефона должен содержать 11 цифр"
            : "";
        break;
      case "email":
        errors.email = !/\S+@\S+\.\S+/.test(value) ? "Не корректный email" : "";
        break;
      default:
        break;
    }
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors });
  }

  const navigate = useNavigate();
  function handleFormSubmit(event) {
    event.preventDefault();

    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.result == 0) {
          navigate("/success");
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  }

  const isButtonDisabled = () => {
    const fieldsNotValid = Object.values(errors).some(
      (error) => error.length > 0
    );
    const fieldsNotFilled = !Object.values(formData).every((field) => field);
    const disablebutton = fieldsNotValid || fieldsNotFilled;
    return disablebutton;
  };

  return (
    <>
      <Link to="/">
        <button>Назад</button>
      </Link>
      <form className="form" name="order" onSubmit={handleFormSubmit}>
        <div className="order">
          <label className="order__field">
            <span className="form__label modal__title">Имя</span>
            <input
              name="name"
              className="form__input"
              type="text"
              placeholder="Введите имя"
              value={formData.name}
              onChange={handleInputChange}
            />
            <span className="form__errors">{errors.name}</span>
          </label>
          <label className="order__field">
            <span className="form__label modal__title">Телефон</span>
            <input
              name="phone"
              className="form__input"
              type="tel"
              placeholder="79998887766"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <span className="form__errors">{errors.phone}</span>
          </label>
          <label className="order__field">
            <span className="form__label modal__title">Email</span>
            <input
              name="email"
              className="form__input"
              type="email"
              placeholder="Введите email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <span className="form__errors">{errors.email}</span>
          </label>
        </div>
        <div className="modal__actions">
          <button
            type="submit"
            className="button order__button"
            disabled={isButtonDisabled()}
          >
            Оплатить
          </button>
          <span className="form__errors"></span>
        </div>
      </form>
    </>
  );
}

export default Form;
