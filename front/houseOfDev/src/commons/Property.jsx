import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imgNot from "../assets/imgNoDisponible.jpg";
import { RxRulerSquare } from "react-icons/rx";
import { PiPhoneCallBold } from "react-icons/pi";
import { BiBed, BiBath, BiHeart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";

function Property({
  property,
  editingPropertyId,
  values,
  handleInputChange,
  handleEditSubmit,
  handleDeleteSubmit,
  handleEditProperty,
  handleAddFav,
  user,
}) {
  return (
    <>
      <div className="flex border-blue-2 ">
        <div className="w-1/3 border-r-blue ">
          {property?.images[0] ? (
            <img src={property?.images} alt="imagen" />
          ) : (
            <img src={imgNot} alt="Imagen no disponible" />
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
                    values.price !== undefined ? values.price : property.price
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
                <div className="border-b-blue text-blue w-3/5 p-2">
                  <SlLocationPin className="inline mr-1" />
                  <p className="inline">{property.address}</p>
                </div>
              </div>
              <div className="flex">
                <div className="border-rb-blue text-blue w-1/3 p-2">
                  <RxRulerSquare className="inline" />
                  <p className="inline"> {property.squareMeter}</p>
                </div>
                <div className="border-rb-blue text-blue w-1/3 p-2">
                  <BiBed className="inline mr-1" />
                  <p className="inline">{property.bedroom} dorm.</p>
                </div>
                <div className="border-b-blue text-blue w-1/3 p-2">
                  <BiBath className="inline mr-1" />
                  <p className="inline">
                    {parseInt(property.bathroom) > 1
                      ? `${property.bathroom} baños`
                      : `${property.bathroom} baño`}
                  </p>
                </div>
              </div>
              <p className="border-b-blue text-blue p-2">
                {property.description}
              </p>
            </>
          )}
          <div className="flex justify-end p-2">
            <button
              type="submit"
              className="w-8 h-8 m-1 mt-2 rounded-icons"
              onClick={() => handleAddFav(property._id)}
            >
              <BiHeart className="color-icons ml-1.5" />
            </button>
            <button type="submit" className="w-8 h-8 m-1 mt-2 rounded-icons">
              <PiPhoneCallBold className="color-icons ml-1.5" />
            </button>
            <Link to={`/viewProperty/${property._id}`}>
              <button
                type="submit"
                className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
              >
                Ver mas
              </button>
            </Link>
            {user?.role === "admin" && property._id !== editingPropertyId && (
              <button
                type="submit"
                className="w-20 border-blue text-blue text-sm py-2 m-1 rounded-full"
                onClick={() => handleEditProperty(property._id)}
              >
                Editar
              </button>
            )}
            {user?.role === "admin" && property._id === editingPropertyId && (
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
    </>
  );
}

export default Property;
