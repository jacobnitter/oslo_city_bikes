import React from "react";
import Station from "../components/Station";
import Oslo from "../images/Oslo.jpg";

const overview = () => {
  return (
    <div>
      <h1 styles={{ alignItems: "center" }}>Oslo City Bike</h1>
      <Station />
    </div>
  );
};
export default overview;
