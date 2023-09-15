import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserByToken } from "../utils/api";
import imgNot from "../assets/imgNoDisponible.jpg";
import Navbar from "../components/Navbar";

function Favorites() {
  const [propertiesUser, setPropertiesUser] = useState({});
  axios.defaults.baseURL = "http://localhost:3000"; // URL de tu backend
  axios.defaults.withCredentials = true; // Habilita el envío de cookies

  useEffect(() => {
    const user = getUserByToken();
    axios
      .get(`http://localhost:3000/api/v1/user/getOne/${user.id}`)
      .then((res) => {
        setPropertiesUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteFav = (e, id) => {
    e.preventDefault();
    console.log(id);
    const user = getUserByToken();
    axios
      .delete(`http://localhost:3000/api/v1/user/favorites/delete/${user.id}`, {
        data: { propertyId: id },
      })
      .then((res) => {
        console.log("se elimino con exito si", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="mt-12 px-6">
        <div className="flex border-blue mb-4">
          <div className="w-1/6">
            <h2 className="text-xl text-blue font-semibold p-2 pt-4">
              Favoritos
            </h2>
          </div>
          <div className="w-5/6 border-b-blue mb-2"></div>
        </div>
        <div>
          {Object.values(propertiesUser).length >= 1 ? (
            <ul className="grid grid-cols-2 xl:grid-cols-3">
              {propertiesUser.favourties?.map((e) => (
                <li key={e._id} className="m-3 p-4">
                  <div className="flex border-blue-2">
                    <div className="w-1/3 border-r-blue">
                      {e?.images[0] ? (
                        <img src={e?.images} alt="Imagen" />
                      ) : (
                        <img src={imgNot} alt="Imagen no disponible" />
                      )}
                    </div>
                    <div className="w-2/3">
                      <div className="flex">
                        <span className="border-rb-blue text-blue w-2/5 p-2">
                          ${e.price}
                        </span>
                        <span className="border-b-blue text-blue w-3/5 p-2">
                          {e.address}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="border-rb-blue text-blue w-1/3 p-2">
                          {e.squareMeter}
                        </span>
                        <span className="border-rb-blue text-blue w-1/3 p-2">
                          {e.bedroom} dorm.
                        </span>
                        <span className="border-b-blue text-blue w-1/3 p-2">
                          {parseInt(e.bathroom) > 1
                            ? `${e.bathroom} baños`
                            : `${e.bathroom} baño`}
                        </span>
                      </div>
                      <p className="border-b-blue text-blue p-2">
                        {e.description}
                      </p>
                      <div className="flex justify-end p-2">
                        <button
                          type="submit"
                          className="w-48 border-blue text-blue text-sm py-2 m-1 rounded-full"
                          onClick={(event) => handleDeleteFav(event, e._id)}
                        >
                          Eliminar de Favoritos
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h1>Al parecer no tienes ninguna propiedad favorita</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorites;
