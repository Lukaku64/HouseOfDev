import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function ViewAllDates() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/properties/getAll")
      .then((response) =>
        setProperties(response.data.filter((e) => e.date.length >= 1))
      )
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
              property.date.map((e) => (
                <>
                  <li key={property.date._id} className="m-2 p-4">
                    <div className="flex border-blue-2">
                      <div className="w-1/3 border-r-blue">
                        {property?.images ? (
                          <img src={property?.images} alt="" />
                        ) : (
                          <h1>{property?.name} </h1>
                        )}
                      </div>
                      <div className="w-2/3">
                        <div className="flex">
                          <span className="border-rb-blue text-blue w-4/5 p-2">
                            ${e.date}
                          </span>
                          <span className="border-b-blue text-blue w-1/5 p-2">
                            {e.hour}
                          </span>
                        </div>
                        <p className="border-b-blue text-blue p-2">
                          {property.address}{" "}
                        </p>
                        <div>
                          <p className="text-blue text-sm">User</p>
                          <p className="text-blue">
                            {`${e.user?.name} ${e.user?.lastName}`}{" "}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue text-sm">Telefono</p>
                          <p className="text-blue">
                            {e.user?.phone ? `${e.user?.phone}` : "********"}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue text-sm">Email</p>
                          <p className="text-blue">{`${e.user?.email}`}</p>
                        </div>
                        <p className="border-b-blue text-blue p-2">
                          {property.description}
                        </p>
                        <div className="flex justify-end p-2">
                          <button
                            type="submit"
                            className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                            onClick={handleSubmit}
                          >
                            Confirmar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ViewAllDates;
