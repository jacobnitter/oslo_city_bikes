import React from "react";
import Station from "../components/Station";

const overview = () => {
  return (
    <div
      style={{
        margin: "2em"
      }}
    >
      <h1 style={{ color: "red" }}>Oslo City Bike</h1>
      <Station />
    </div>
  );
};
export default overview;
