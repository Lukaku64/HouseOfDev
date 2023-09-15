import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import imgNot from "../assets/imgNoDisponible.jpg";

function ViewAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/get")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUserDelete = (e, userId) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/api/v1/user/delete/${userId}`)
      .then((response) => {
        console.log("se elimino el usuario", response);
      })
      .catch((err) => console.log(err));
  };
  console.log(users);
  return (
    <>
      <Navbar />
      <div className="mt-12 px-6">
        <div className="flex border-blue mb-4">
          <div className="w-1/6">
            <h2 className="text-xl text-blue font-semibold p-2 pt-4">
              USUARIOS
            </h2>
          </div>
          <div className="w-5/6 border-b-blue mb-2"></div>
        </div>
        <div>
          <ul className="grid grid-cols-2 xl:grid-cols-3">
            {users
              ?.filter((e) => e.role != "admin")
              .map((user) => (
                <li key={user._id} className="m-2 p-4">
                  <div className="flex border-blue-2">
                    <div className="w-1/3 border-r-blue">
                      <div className="h-48">
                        {user?.images ? (
                          <img
                            src={property?.images}
                            alt="imagen de la propiedad"
                          />
                        ) : (
                          <img src={imgNot} alt="imagen no disponible"></img>
                        )}
                      </div>
                      <div className="flex justify-start p-2">
                        <button
                          type="submit"
                          className="w-32 border-blue text-blue text-sm py-2 m-1 rounded-full"
                          onClick={(event) => handleUserDelete(event, user._id)}
                        >
                          Eliminar Usuario
                        </button>
                      </div>
                    </div>
                    <div className="w-2/3">
                      <div className="border-b-blue py-1 pl-6">
                        <p className="text-blue text-sm">Nombre</p>
                        <p className="text-blue font-semibold">{user.name}</p>
                      </div>
                      <div className="border-b-blue py-1 pl-6">
                        <p className="text-blue text-sm">Apellido</p>
                        <p className="text-blue font-semibold">
                          {user.lastName}
                        </p>
                      </div>

                      <div className="border-b-blue py-1 pl-6">
                        <p className="text-blue text-sm">Rol</p>
                        <p className="text-blue font-semibold">{user.role}</p>
                      </div>
                      <div className="border-b-blue py-1 pl-6">
                        <p className="text-blue text-sm">Telefono</p>
                        <p className="text-blue font-semibold">
                          {user?.phone ? `${user?.phone}` : "********"}
                        </p>
                      </div>
                      <div className=" py-1 pl-6">
                        <p className="text-blue text-sm">Email</p>
                        <p className="text-blue font-semibold">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ViewAllUsers;
