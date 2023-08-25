import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import houseImage from "../assets/house.png";
import ofDevImage from "../assets/ofDev.png";
import { setUser } from "../store/user";

const initalValues = {
  email: "",
  password: "",
};

function Login() {
  const [values, setValues] = useState(initalValues);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.baseURL = "http://localhost:3000"; // URL de tu backend
  axios.defaults.withCredentials = true; // Habilita el envío de cookies

  useEffect(() => {
    return values.email && values.password && isValidEmail(values.email)
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
      .post("http://localhost:3000/api/v1/user/login", values)
      .then((response) => {
        const user = response.data;
        console.log(user);
        dispatch(setUser(user));
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-screen flex background-image">
        <div className="background-red w-128 ">
          <div className="mt-56 ml-96 shadow-xl">
            <div className="background-red text-white p-8 rounded w-96">
              <img src={houseImage} alt="" className="mt-8 mb-4" />
              <img src={ofDevImage} alt="" className="mt-4 mb-12 ml-auto" />
              <div className="mt-5">
                <p className="text-lg text-end mt-4 mb-12">
                  Tu nueva vivienda está aquí
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded  w-96">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    required={true}
                    className="w-full px-3 py-2 border-blue rounded-full"
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
                    className="w-full px-3 py-2 border-blue rounded-full"
                    placeholder="Password"
                  />
                </div>
                <a className="text-sm text-blue" href="https://www.google.com/">
                  ¿Olvidaste tu contraseña?
                </a>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-24 border-blue text-blue py-2 rounded-full"
                    disabled={!isChange}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="background-gradient fixed right-0"></div>
      </div>
    </>
  );
}

export default Login;
