import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserByToken } from "../utils/api";
import { useLocation } from "react-router-dom";
import Property from "../commons/Property";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [user, setClient] = useState(null);
  const [values, setValues] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = location.pathname;
  const state = searchParams.get("state");
  const address = searchParams.get("address");

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

  useEffect(() => {
    const page = currentPage.split("/")[1];
    const filtered = page
      ? properties.filter((property) => {
          return property.state.includes(
            page == "onSale" ? "comprar" : "alquiler"
          );
        })
      : properties.filter((property) => {
          return (
            property.state.includes(state) ||
            property.address.toLowerCase().includes(address?.toLowerCase())
          );
        });
    setFilteredProperties(filtered);
  }, [properties]);
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

  const handlePrice = (e) => {
    console.log("eeeee");
    const minPrice = parseFloat(values.min);
    const maxPrice = parseFloat(values.max);
    const filterProp = (property) => {
      const propertyPrice = parseFloat(property.price);
      if (minPrice && maxPrice && values.addressChange) {
        return (
          propertyPrice >= minPrice &&
          propertyPrice <= maxPrice &&
          property.address
            .toLowerCase()
            .includes(values.addressChange?.toLowerCase())
        );
      } else {
        return (
          (propertyPrice >= minPrice && propertyPrice <= maxPrice) ||
          property.address
            .toLowerCase()
            .includes(values.addressChange?.toLowerCase())
        );
      }
    };
    const page = currentPage.split("/")[1];
    if ((!isNaN(minPrice) && !isNaN(maxPrice)) || values.addressChange) {
      const filtered =
        filteredProperties >= 1
          ? filteredProperties.filter((property) => {
              const propertyPrice = parseFloat(property.price);
              return propertyPrice >= minPrice && propertyPrice <= maxPrice;
            })
          : page.length >= 3
          ? filteredProperties.filter(filterProp)
          : properties.filter(filterProp);
      setFilteredProperties(filtered);
    }
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

  const handleAddFav = (propertyId) => {
    console.log(user.id);
    axios
      .post(`http://localhost:3000/api/v1/user/favorites/add/${user.id}`, {
        propertyId,
      })
      .then((res) => {
        console.log("se agrego a favoritos", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!state?.length >= 1 && (
        <>
          {address == null && (
            <div className="ml-5">
              <h1 className="text-lg font-semibold ">Ubicacion</h1>
              <input
                type="text"
                name="addressChange"
                value={values.addressChange}
                onChange={handleInputChange}
                placeholder="Ubicacion"
                className="border-blue text-sm mx-2 text-center w-64"
              />
            </div>
          )}
          <div className="ml-5">
            <h1 className="text-lg font-semibold ">Precio</h1>
            <input
              type="text"
              name="min"
              value={values.min}
              onChange={handleInputChange}
              placeholder="Mínimo"
              className="border-blue text-sm mx-2 text-center w-32"
            />
            <input
              type="text"
              name="max"
              value={values.max}
              onChange={handleInputChange}
              placeholder="Máximo"
              className="border-blue text-sm mx-2 text-center w-32"
            />
            <button
              type="submit"
              className="w-20 border-blue text-blue text-sm py-1 m-1 rounded-full"
              onClick={handlePrice}
            >
              Aceptar
            </button>
          </div>
        </>
      )}
      <ul className="grid grid-cols-2 xl:grid-cols-3">
        {filteredProperties.length >= 1
          ? filteredProperties.map((property) => (
              <li key={property._id} className="m-3 p-4">
                <Property
                  property={property}
                  editingPropertyId={editingPropertyId}
                  values={values}
                  handleInputChange={handleInputChange}
                  handleEditSubmit={handleEditSubmit}
                  handleDeleteSubmit={handleDeleteSubmit}
                  handleEditProperty={handleEditProperty}
                  handleAddFav={handleAddFav}
                  user={user}
                />
              </li>
            ))
          : properties.map((property) => (
              <li key={property._id} className="m-3 p-4">
                <Property
                  property={property}
                  editingPropertyId={editingPropertyId}
                  values={values}
                  handleInputChange={handleInputChange}
                  handleEditSubmit={handleEditSubmit}
                  handleDeleteSubmit={handleDeleteSubmit}
                  handleEditProperty={handleEditProperty}
                  handleAddFav={handleAddFav}
                  user={user}
                />
              </li>
            ))}
      </ul>
    </>
  );
}

export default Properties;
