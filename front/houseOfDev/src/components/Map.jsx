import React from "react";
import { envs } from "../config/backend";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -34.6037406,
  lng: -58.3817391,
};

function Map() {
  const { VITE_API_KEY } = envs;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
