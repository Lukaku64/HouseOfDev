import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByToken } from "../utils/api";
import Navbar from "../components/Navbar";

function ViewAppointment() {
  const [property, setProperty] = useState({});
  const [user, setClient] = useState(null);
  const [values, setValues] = useState({});
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const handle = async () => {
      const user = getUserByToken();
      !user ? setIsChange(true) : setIsChange(false);
      return setClient(user);
    };
    handle();
    axios
      .get(`http://localhost:3000/api/v1/properties/get/${params.id}`)
      .then((response) => setProperty(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.id) setValues({ ...values, userId: user.id });
    axios
      .post(`http://localhost:3000/api/v1/properties/date/${params.id}`, values)
      .then(() => {
        setTimeout(() => navigate(), 1500);
      })
      .catch((err) => console.log(err));
  };

  console.log(property);
  console.log(user);
  console.log(values);
  console.log("userId", user?.id);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-2/4">
          <h2 className="text-2xl mb-4 text-blue">Agendar cita</h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 mb-4">
              <p className="text-base text-blue mb-4 pb-4">
                {`Estas por agendar una cita para la propiedad ${property.name} en la ubicacion de ${property.address}`}{" "}
              </p>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-1 font-medium text-blue"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={values.date || ""}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa el nombre de la propiedad"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-1 font-medium text-blue"
                >
                  Hora
                </label>
                <input
                  type="time"
                  id="hour"
                  name="hour"
                  value={values.hour || ""}
                  onChange={handleInputChange}
                  required={true}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingresa el nombre de la propiedad"
                />
              </div>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
                disabled={isChange}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewAppointment;
