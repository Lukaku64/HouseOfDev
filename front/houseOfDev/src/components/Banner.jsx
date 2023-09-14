import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { MdNotifications, MdOutlineArrowRightAlt } from "react-icons/md";

function Banner() {
  const location = useLocation();
  const currentPage = location.pathname;
  const page = currentPage.split("/")[1];
  return (
    <>
      <div className="mt-6 px-12 pb-10 ">
        <div className="flex border-blue mb-4">
          <div className="w-2/6">
            <h2 className="text-xl text-blue font-semibold p-2 pt-4">
              {page !== ""
                ? page == "rent"
                  ? "PROPIEDADES EN ALQUILER"
                  : "PROPIEDADES PARA COMPRAR"
                : "PROPIEDADES"}
            </h2>
          </div>
          <div className="w-5/6 border-b-blue mb-2"></div>
        </div>
        <div className="flex justify-end ">
          <Link to={"/notificaciones"}>
            <div className="flex w-44 border-blue text-blue text-sm py-2 m-1 rounded-full">
              <div className="mx-1 p-1 rounded-icons">
                <MdNotifications />
              </div>
              <div className="w-full">
                <button className="w-full">NOTIFICACIONES</button>
              </div>
            </div>
          </Link>
          <Link to={"/favorites"}>
            <div className="flex w-36 border-favoritos text-blue text-sm py-2 m-1 rounded-full">
              <div className="mx-1 p-1 rounded-icons">
                <BiHeart />
              </div>
              <div className="w-full">
                <button className="w-full">FAVORITOS</button>
              </div>
            </div>
          </Link>
        </div>
        <div className="h-64 border-b-blue pb-100 pt-4 ">
          <div className="background-image-banner relative">
            <div className="background-gradient-banner right-0 absolute">
              <div className="w-100 p-12 xl:ml-10 xl:w-102 xl:mt-12 2xl:ml-28 2xl:w-102 ">
                <h1 className="text-white text-4xl font-black	text-right">
                  Lorem ipsum dolor amet, consectetur adipiscing elit
                </h1>
                <div className="flex justify-end mt-4">
                  <Link to={"/inmobiliaria"}>
                    <div className="flex w-40 border text-blue bg-white text-sm p-2 m-1 rounded-full">
                      <div className="w-full">
                        <button className="w-full">INMOBILIARIA</button>
                      </div>
                      <div className="mx-1 p-1 rounded-icons">
                        <MdOutlineArrowRightAlt />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
