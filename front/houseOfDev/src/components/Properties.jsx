import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserByToken } from "../utils/api";

const initalValues = {
  address: "",
  price: "",
  description: "",
  squareMeter: "",
  bedroom: "",
  bathroom: "",
};

function Properties() {
  const [properties, setProperties] = useState([]);
  const [user, setClient] = useState(null);
  const [values, setValues] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  axios.defaults.baseURL = "http://localhost:3000"; // URL de tu backend
  axios.defaults.withCredentials = true; // Habilita el envío de cookies

  useEffect(() => {
    const handle = async () => {
      const user = getUserByToken();
      return setClient(user);
    };
    handle();
    axios
      .get("http://localhost:3000/api/v1/properties/getAll")
      .then((response) => setProperties(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEditProperty = (propertyId) => {
    setEditingPropertyId(propertyId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/api/v1/properties/update/${editingPropertyId}`,
        values
      )
      .then(() => {
        setEditingPropertyId(null);
        setValues({});
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(
        `http://localhost:3000/api/v1/properties/delete/${editingPropertyId}`
      )
      .then(() => {
        setEditingPropertyId(null);
        setValues({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ul className="grid grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <li key={property._id} className="m-3 p-4">
            <div className="flex border-blue-2 ">
              <div className="w-1/3 border-r-blue ">
                {property?.images ? (
                  <img src={property?.images} alt="" />
                ) : (
                  <h1>{property?.name} </h1>
                )}
              </div>
              <div className="w-2/3">
                {property._id === editingPropertyId ? (
                  <>
                    <div className="flex">
                      <input
                        type="text"
                        name="price"
                        value={
                          values.price !== undefined
                            ? values.price
                            : property.price
                        }
                        onChange={handleInputChange}
                        placeholder={property.price}
                        className="border-rb-blue text-blue w-2/5 p-2"
                      />
                      <input
                        type="text"
                        name="address"
                        value={
                          values.address !== undefined
                            ? values.address
                            : property.address
                        }
                        onChange={handleInputChange}
                        placeholder={property.address}
                        className="border-b-blue text-blue w-3/5 p-2"
                      />
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        name="squareMeter"
                        value={
                          values.squareMeter !== undefined
                            ? values.squareMeter
                            : property.squareMeter
                        }
                        onChange={handleInputChange}
                        placeholder={property.squareMeter}
                        className="border-rb-blue text-blue w-1/3 p-2"
                      />
                      <input
                        type="text"
                        name="bedroom"
                        value={
                          values.bedroom !== undefined
                            ? values.bedroom
                            : property.bedroom
                        }
                        onChange={handleInputChange}
                        placeholder={property.bedroom}
                        className="border-rb-blue text-blue w-1/3 p-2"
                      />
                      <input
                        type="text"
                        name="bathroom"
                        value={
                          values.bathroom !== undefined
                            ? values.bathroom
                            : property.bathroom
                        }
                        onChange={handleInputChange}
                        placeholder={property.bathroom}
                        className="border-b-blue text-blue w-1/3 p-2"
                      />
                    </div>
                    <input
                      type="text"
                      name="description"
                      value={
                        values.description !== undefined
                          ? values.description
                          : property.description
                      }
                      onChange={handleInputChange}
                      placeholder={property.description}
                      className="border-b-blue text-blue p-2 w-full"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex">
                      <span className="border-rb-blue text-blue w-2/5 p-2">
                        ${property.price}
                      </span>
                      <span className="border-b-blue text-blue w-3/5 p-2">
                        {property.address}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="border-rb-blue text-blue w-1/3 p-2">
                        {property.squareMeter}
                      </span>
                      <span className="border-rb-blue text-blue w-1/3 p-2">
                        {property.bedroom} dorm.
                      </span>
                      <span className="border-b-blue text-blue w-1/3 p-2">
                        {property.bathroom} baños
                      </span>
                    </div>
                    <p className="border-b-blue text-blue p-2">
                      {property.description}
                    </p>
                  </>
                )}
                <div className="flex justify-end p-2">
                  <button
                    type="submit"
                    className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                  >
                    Ver mas
                  </button>
                  {user?.role === "admin" &&
                    property._id !== editingPropertyId && (
                      <button
                        type="submit"
                        className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                        onClick={() => handleEditProperty(property._id)}
                      >
                        Editar
                      </button>
                    )}
                  {user?.role === "admin" &&
                    property._id === editingPropertyId && (
                      <>
                        <button
                          type="submit"
                          className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                          onClick={handleDeleteSubmit}
                        >
                          Eliminar
                        </button>
                        <button
                          type="submit"
                          className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                          onClick={() => handleEditProperty(null)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                          onClick={handleEditSubmit}
                        >
                          Aceptar
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Properties;
