import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, userInitialState } from "../store/user";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../utils/api";
import hod from "../assets/hod.svg";
import axios from "axios";

function Navbar() {
  const [user, setClient] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.baseURL = "http://localhost:3000"; // URL de tu backend
  axios.defaults.withCredentials = true; // Habilita el envío de cookies

  useEffect(() => {
    const handle = async () => {
      const user = getUserByToken();
      return setClient(user);
    };
    handle();
  }, []);

  const handleLogOut = () => {
    axios
      .post("http://localhost:3000/api/v1/user/logOut", null)
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          dispatch(setUser(userInitialState));
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav
      className={`text-white p-5 flex justify-between items-center ${
        user?.role == "admin" ? "background-blue" : "background-red "
      }`}
    >
      <a href="/">
        <img src={hod} alt="" className="ml-40" />
      </a>
      <div>
        <a href="/onSale" className="text-base mx-3">
          En venta
        </a>
        <a href="rent" className="text-base mx-3">
          Alquiler
        </a>
        {user?.role == "admin" ? (
          <a href="/createpost" className="text-base mx-3">
            Agrega Propiedades
          </a>
        ) : (
          <a href="" className="text-base mx-3">
            Agenda tu visita
          </a>
        )}
        <a href="" className="text-base mx-3">
          Nuestros servicios
        </a>
        <a href="/viewUser" className="text-base mx-3">
          Perfil
        </a>
        <a href="" className="text-base mx-3">
          Nosotros
        </a>
        <a href="" className="text-base mx-3">
          Contacto
        </a>
        {!user?.email ? (
          <>
            <a href="/register" className="text-base mx-3">
              Registrarse
            </a>
            <a href="/login" className="text-base">
              Login
            </a>
          </>
        ) : (
          <>
            {user?.role == "admin" || user?.role == "agente" ? (
              <a href="/viewAllDates" className="text-base mx-3">
                Ver Citas
              </a>
            ) : (
              <a href="" className="text-base mx-3">
                Favoritos
              </a>
            )}
            <button onClick={handleLogOut}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
