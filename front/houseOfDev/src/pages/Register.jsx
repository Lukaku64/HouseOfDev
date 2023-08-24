import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initalValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function register() {
  const [values, setValues] = useState(initalValues);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return values.name &&
      values.lastName &&
      values.email &&
      values.password &&
      values.confirmPassword &&
      values.password === values.confirmPassword &&
      isValidEmail(values.email)
      ? setIsChange(true)
      : setIsChange(false);
  }, [values]);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/user/register", values)
      .then(() => {
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-2/4">
          <h2 className="text-2xl mb-4">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                required={true}
                className="w-full px-3 py-2 border rounded"
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1 font-medium">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                required={true}
                className="w-full px-3 py-2 border rounded"
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                required={true}
                className="w-full px-3 py-2 border rounded"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                required={true}
                className="w-full px-3 py-2 border rounded"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium"
              >
                Repite tu contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
                required={true}
                className="w-full px-3 py-2 border rounded"
                placeholder="Ingresa tu contraseña"
              />
              {values.password != values.confirmPassword && (
                <span>Las contraseñas no coinciden</span>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
                disabled={!isChange}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default register;
