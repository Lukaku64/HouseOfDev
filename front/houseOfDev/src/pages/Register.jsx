import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const initalValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
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
      <Navbar />
      <div className="min-h-screen flex background-image">
        <div className="background-white w-128">
          <div className="mt-56 ml-96 shadow-xl">
            <div className="background-white p-8 rounded w-96">
              <h2 className="text-2xl mb-4 text-blue border-b-blue mb-4 p-2">
                Registro
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    required={true}
                    className="w-full px-3 py-2 border-blue rounded-full background-white"
                    placeholder="Nombre"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    required={true}
                    className="w-full px-3 py-2 border-blue rounded-full background-white"
                    placeholder="Apellido"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    required={true}
                    className="w-full px-3 py-2 border-blue rounded-full background-white"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    required={true}
                    className="w-full px-3 py-2 border-blue rounded-full background-white"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleInputChange}
                    required={true}
                    className="w-full px-3 py-2 border-blue rounded-full background-white"
                    placeholder="Confirmar Contraseña"
                  />
                  {values.password !== values.confirmPassword && (
                    <span>Las contraseñas no coinciden</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-24 border-blue text-blue py-2 rounded-full"
                    disabled={!isChange}
                  >
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
