import React from "react";
import Station from "../components/Station";
import Oslo from "../images/Oslo.jpg";
import "../App.css";

const overview = () => {
  return (
    <div
      style={{
        margin: "2em"
      }}
    >
      <h1 style={{ color: "yellow" }}>Oslo City Bike</h1>
      <Station />
    </div>
  );
};
export default overview;
