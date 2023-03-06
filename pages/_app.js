import React from "react";
import "/Users/Sefa/Streetline/cs2001-2022_23-group9/streetline-website/styles/globals.css";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const App = () => {
  const onLoad = (ref) => console.log(ref);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: 100,
        }}
      >
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default App;
