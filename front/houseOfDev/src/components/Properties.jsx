import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserByToken } from "../utils/api";
import { Link, useLocation } from "react-router-dom";
import Property from "../commons/Property";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [user, setClient] = useState(null);
  const [values, setValues] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
    const filtered = properties.filter((property) => {
      return (
        property.state.includes(state) ||
        property.address.toLowerCase().includes(address.toLowerCase())
      );
    });
    setFilteredProperties(filtered);
  }, [properties]);
  console.log(filteredProperties);

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
                  user={user}
                />
              </li>
            ))}
      </ul>
    </>
  );
}

export default Properties;
