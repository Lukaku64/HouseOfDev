import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getUserByToken } from "../utils/api";
import axios from "axios";

function ViewProperty() {
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState({});
  const [values, setValues] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/properties/get/${params.idProperty}`)
      .then((response) => setProperty(response.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/properties/review/${params.idProperty}/get`
      )
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleStarClick = (clickedStar) => {
    setValues({
      ...values,
      stars: clickedStar,
    });
  };

  const dateConversion = (value) => {
    const months = {
      "01": "ene.",
      "02": "feb.",
      "03": "mar.",
      "04": "abr.",
      "05": "may.",
      "06": "jun.",
      "07": "jul.",
      "08": "ago.",
      "09": "sep.",
      10: "oct.",
      11: "nov.",
      12: "dic.",
    };
    const arr = value.split("T")[0];
    const month = arr.split("-")[1];
    const array = arr.replace(month, months[month]);
    return array.split("-").reverse().join(" ");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const user = getUserByToken();
    axios
      .post(
        `http://localhost:3000/api/v1/properties/review/${params.idProperty}/post`,
        { ...values, userId: user.id }
      )
      .then((response) => {
        console.log("creado con exito", response);
      })
      .catch((err) => console.log(err));
  };

  console.log(reviews);
  console.log(values);
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
                <Link to={`/viewAppointment/${property._id}`}>
                  <button className="w-30 border-blue text-blue text-sm p-2 m-1 rounded-full">
                    Agendar Cita
                  </button>
                </Link>
                <button className="w-30 border-blue text-blue text-sm p-2 m-1 rounded-full">
                  Agregar a Favoritos
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-3/6">
              <h1 className="text-2xl ml-10 mt-4">Ubicacion</h1>
              <p className="text-base ml-14">{property.address} </p>
              <h1 className="text-2xl ml-10 mt-4">Descripcion</h1>
              <p className="text-base ml-14 mb-24">{property.description}</p>
            </div>
            <div className="w-3/6">
              <Map />
            </div>
          </div>
          <h1 className="text-2xl mt-4 ml-10 mb-2">
            Opiniones sobre el producto
          </h1>
          <div className="flex">
            <div className="w-2/6 flex">
              <div className="w-2/5">
                <h1 className="text-3xl text-center">
                  {reviews?.averageRating}
                </h1>
              </div>
              <div className="w-3/5">
                <p className="flex flex-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${
                        star <= reviews.averageRating ? "selected" : ""
                      }`}
                    />
                  ))}
                </p>
                <p className="text-sm">
                  {reviews?.reviews?.length} calificaciones{" "}
                </p>
              </div>
            </div>
            <div className="w-4/6">
              <h1 className="text-lg">Agrega tu opinion</h1>
              <form onSubmit={handleAddReview}>
                <div className="flex">
                  <div className="w-4/6 mr-8">
                    <p className="flex flex-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`star ${
                            star <= (values.stars || 0) ? "selected" : ""
                          }`}
                          onClick={() => handleStarClick(star)}
                        />
                      ))}
                    </p>
                    <div>
                      <textarea
                        name="comments"
                        id=""
                        cols="50"
                        rows="5"
                        value={values.comments || ""}
                        onChange={handleInputChange}
                        className="resize-none my-4 border-blue"
                      ></textarea>
                    </div>
                  </div>
                  <button className="w-24 h-16 rounded-lg bg-blue-500 text-white py-4 mt-8 ml-12">
                    Enviar
                  </button>
                </div>
              </form>
              <ul>
                {reviews?.reviews?.map((e) => (
                  <li key={e._id}>
                    <div className="flex mb-2">
                      <div className="w-1/6">
                        <p className="text-sm">
                          {`${e.user.lastName} ${e.user.name}`}{" "}
                        </p>
                      </div>
                      <div className="w-4/6"></div>
                      <div className="w-1/6">
                        <p className="text-sm">{dateConversion(e.createdAt)}</p>
                      </div>
                    </div>
                    <p className="mb-6 pb-6 border-b">{e.comments}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProperty;
