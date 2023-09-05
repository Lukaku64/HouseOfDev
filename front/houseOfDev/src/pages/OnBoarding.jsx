import React, { useState, useEffect } from "react";
import axios from "axios";

function OnBoarding() {
  const [values, setValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(values);
  return (
    <>
      <div className="min-h-screen flex background-image">
        <div className="background-red w-128 ">
          <div className="mt-56 ml-96 shadow-xl">
            <div className="bg-white py-24 px-20 rounded w-102">
              <form onSubmit={handleSubmit}>
                <div className="border-blue-2 mb-2">
                  <div className="flex border-b-blue mb-4">
                    <div className="w-2/6">
                      <h1 className="text-blue font-extrabold ml-4 ">
                        ¿Qué estas buscando?
                      </h1>
                    </div>
                    <div className="w-5/6 border-b-blue mb-2"></div>
                  </div>
                  <div className="mb-4 pb-2 border-b-blue">
                    <input
                      type="radio"
                      id="alquiler"
                      name="state"
                      value="alquiler"
                      onChange={handleInputChange}
                      className="ml-3"
                    />
                    <label
                      htmlFor="alquiler"
                      className="ml-2 text-blue text-base"
                    >
                      Alquiler
                    </label>
                  </div>
                  <div className="mb-4">
                    <input
                      type="radio"
                      id="comprar"
                      name="state"
                      value="comprar"
                      onChange={handleInputChange}
                      className="ml-3"
                    />
                    <label
                      htmlFor="comprar"
                      className="ml-2 text-blue text-base"
                    >
                      Comprar
                    </label>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    placeholder="Ubicacion"
                    className="w-full px-3 text-sm py-2 border-blue rounded-full mb-2"
                  />
                </div>
                <div className="flex justify-end">
                  <a
                    href={`/?state=${values.state}&address=${values.address}`}
                    className="w-40 border-blue text-blue py-2 rounded-full"
                  >
                    Ver Propiedades
                  </a>
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

export default OnBoarding;
