import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import imgNot from "../assets/imgNoDisponible.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewAllDates() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/properties/getAll")
      .then((response) =>
        setProperties(response.data.filter((e) => e.date.length >= 1))
      )
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e, propertyId, dateId) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3000/api/v1/properties/date/confirm/${propertyId}`,
        { dateId, confirm: true }
      )
      .then(() => {
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => console.log(err));
  };

  console.log(properties);
  return (
    <>
      <Navbar />
      <div className="mt-12 px-6">
        <div className="flex border-blue mb-4">
          <div className="w-1/6">
            <h2 className="text-xl text-blue font-semibold p-2 pt-4">
              PRÓXIMAS CITAS
            </h2>
          </div>
          <div className="w-5/6 border-b-blue mb-2"></div>
        </div>
        <div>
          <ul className="grid grid-cols-2 xl:grid-cols-3">
            {properties.map((property) =>
              property.date
                .filter((e) => e.confirm == false)
                .map((e) => (
                  <li key={e._id} className="m-2 p-4">
                    <div className="flex border-blue-2">
                      <div className="w-1/3 border-r-blue">
                        <div className="h-48">
                          {property?.images[0] ? (
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
                            onClick={(event) =>
                              handleSubmit(event, property._id, e._id)
                            }
                          >
                            Confirmar cita
                          </button>
                        </div>
                      </div>
                      <div className="w-2/3">
                        <div className="flex">
                          <span className="border-rb-blue text-blue w-4/5 p-2 font-semibold ">
                            {e.date}
                          </span>
                          <span className="border-b-blue text-blue w-1/5 p-2 text-center pt-3 font-semibold">
                            {e.hour}
                          </span>
                        </div>
                        <p className="border-b-blue text-blue py-2 pl-6">
                          {property.address}{" "}
                        </p>
                        <div className="border-b-blue py-1 pl-6">
                          <p className="text-blue text-sm">User</p>
                          <p className="text-blue font-semibold">
                            {`${e.user?.name} ${e.user?.lastName}`}{" "}
                          </p>
                        </div>
                        <div className="border-b-blue py-1 pl-6">
                          <p className="text-blue text-sm">Telefono</p>
                          <p className="text-blue font-semibold">
                            {e.user?.phone ? `${e.user?.phone}` : "********"}
                          </p>
                        </div>
                        <div className=" py-1 pl-6">
                          <p className="text-blue text-sm">Email</p>
                          <p className="text-blue font-semibold">{`${e.user?.email}`}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ViewAllDates;
