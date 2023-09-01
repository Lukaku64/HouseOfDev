import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserByToken } from "../utils/api";
import Navbar from "../components/Navbar";

function ViewUser() {
  const [user, setClient] = useState(null);

  useEffect(() => {
    const handle = async () => {
      const user = getUserByToken();
      return setClient(user);
    };
    handle();

    //   axios
    //     .get(
    //       `http://localhost:3000/api/v1/user/getOne/64e621232b8ea9080b283d28http://localhost:3000/api/v1/user/getOne/${user._id}`
    //     )
    //     .then()
    //     .catch((err) => console.log(err));
  }, []);
  console.log(user);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-16 pl-32 pr-32 m-48 w-full rounded shadow-md w-2/4">
          <div className="flex border-blue mb-4 ">
            <div className="w-2/6">
              <h2 className="text-xl  text-blue font-semibold p-2 pt-4">
                MI PERFIL
              </h2>
            </div>
            <div className="w-5/6 border-b-blue mb-2"></div>
          </div>
          <div className="flex">
            <div className="w-5/6">
              <button
                type="submit"
                className="w-20 border-perfil text-blue text-sm py-2 m-1 mb-10 rounded-full "
              >
                Editar
              </button>
              <p className="text-xs text-blue">Nombre</p>
              <p className="text-lg text-blue font-semibold mb-4 border-b-blue">
                {user.name}
              </p>
            </div>
            <div className="w-1/6">
              <img src="" alt="imagen del usuario" />
            </div>
          </div>
          <p className="text-xs text-blue">Apellido</p>
          <p className="text-lg text-blue font-semibold mb-4 border-b-blue">
            {user.lastName}
          </p>
          <p className="text-xs text-blue">Email</p>
          <p className="text-lg text-blue font-semibold mb-4 border-b-blue">
            {user.email}
          </p>
          <p className="text-xs text-blue">Telefono </p>
          <p className="text-lg text-blue font-semibold mb-4 border-b-blue">
            {user?.phone ? user.phone : "No proporcionaste un numero"}
          </p>
          <p className="text-xs text-blue">Contraseña</p>
          <p className="text-lg text-blue font-semibold mb-4 border-b-blue">
            No puedes visualizar la contraseña
          </p>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
