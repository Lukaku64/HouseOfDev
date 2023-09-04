import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewProperty() {
  const [property, setProperty] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/properties/get/${params.idProperty}`)
      .then((response) => setProperty(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md w-3/4 flex flex-col">
          <div className="p-8 rounded flex">
            <div className="w-4/6">
              <img src={property?.images} alt="" />
            </div>
            <div className="w-2/6 border-solid border-2 border-gray-200 rounded-md ml-2">
              <p className="text-slate-500 text-sm my-3 ml-2">
                Casa
                {property.state == "comprar"
                  ? ` para ${property.state}`
                  : ` en ${property.state}`}
              </p>
              <h1 className="text-4xl font-semibold mb-8 ml-2">
                {property?.name}
              </h1>
              <p className="text-5xl mt-4 mb-4">U$S {property.price}</p>
              <div className="ml-6 mt-14">
                <p className="text-xl">{property.squareMeter}</p>
                <p className="text-xl">
                  {parseInt(property.bedroom) > 1
                    ? `${property.bedroom} dormitorios`
                    : `${property.bedroom} dormitorio`}
                </p>
                <p className="text-xl">
                  {parseInt(property.bathroom) > 1
                    ? `${property.bathroom} baños`
                    : `${property.bathroom} baño`}
                </p>
              </div>
              <div className="flex h-44 2xl:h-80 justify-end items-end p-2">
                <button className="w-30 border-blue text-blue text-sm p-2 m-1 rounded-full">
                  Agendar Cita
                </button>
                <button className="w-30 border-blue text-blue text-sm p-2 m-1 rounded-full">
                  Agregar a Favoritos
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl ml-10 mt-4">Ubicacion</h1>
            <p className="text-base ml-14">{property.address} </p>
            <h1 className="text-2xl ml-10 mt-4">Descripcion</h1>
            <p className="text-base ml-14 mb-24">{property.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProperty;
