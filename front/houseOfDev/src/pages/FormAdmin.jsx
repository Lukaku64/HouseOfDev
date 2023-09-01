import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const initalValues = {
  name: "",
  address: "",
  price: "",
  description: "",
  squareMeter: "",
  images: [],
  state: "",
  bedroom: "",
  bathroom: "",
};

function FormAdmin() {
  const [values, setValues] = useState(initalValues);
  const [isChange, setIsChange] = useState(true);

  // useEffect(() => {
  //   return values.name &&
  //     values.address &&
  //     values.price &&
  //     values.description &&
  //     values.squareMeter &&
  //     values.state &&
  //     values.bedroom &&
  //     values.bathroom
  //     ? setIsChange(true)
  //     : setIsChange(false);
  // }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setValues({
        ...values,
        [name]: files,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("squareMeter", values.squareMeter);
    formData.append("state", values.state);
    formData.append("bedroom", values.bedroom);
    formData.append("bathroom", values.bathroom);
    for (let i = 0; i < values.images.length; i++) {
      formData.append("images", values.images[i]);
    }
    axios
      .post("http://localhost:3000/api/v1/properties/create", formData, {})
      .then(() => console.log("publicado"))
      .catch((err) => console.log(err));
  };
  console.log(values);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-2/4">
          <h2 className="text-2xl mb-4">Publicar Propiedad</h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-1 mb-4">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa el nombre de la propiedad"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-1 font-medium">
                  Direccion
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa la direccion de la propiedad"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-1 font-medium">
                  Precio
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa el precio"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1 font-medium">
                  Descripcion
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa la descripcion de la propiedad"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="squareMeter" className="block mb-1 font-medium">
                  Metros cuadrados
                </label>
                <input
                  type="text"
                  id="squareMeter"
                  name="squareMeter"
                  value={values.squareMeter}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa los metros cuadrados de la propiedad"
                />
              </div>
            </div>
            <div className="col-span-1 mb-4">
              <div className="mb-4">
                <label htmlFor="images" className="block mb-1 font-medium">
                  Imagenes
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleInputChange}
                  required={true}
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa imagenes de la propiedad"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="state" className="block mb-1 font-medium">
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="¿De alquiler o para vender?"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bedroom" className="block mb-1 font-medium">
                  Habitaciones
                </label>
                <input
                  type="text"
                  id="bedroom"
                  name="bedroom"
                  value={values.bedroom}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="¿Cuantas habitaciones tiene?"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bathroom" className="block mb-1 font-medium">
                  Baños
                </label>
                <input
                  type="text"
                  id="bathroom"
                  name="bathroom"
                  value={values.bathroom}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="¿Cuantos baños tiene?"
                />
              </div>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
                disabled={!isChange}
              >
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormAdmin;
