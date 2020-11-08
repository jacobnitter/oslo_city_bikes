import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./StylingCard";

const Station = () => {
  const [freeBikes, setFreeBikes] = useState([]);
  const [freeDocks, setFreeDocks] = useState([]);
  const [stationName, setStationName] = useState([]);
  const [completeStations, setCompleteStations] = useState([]);

  useEffect(() => {
    console.log("cs: ", completeStations);
    setNameWithDocksAndBikes();
  }, [stationName]);

  const handleFreeBikes = result => {
    console.log(result[0]);
    for (let i = 0; i < result.length; i++) {
      let bike = {
        free_bikes: result[i].num_bikes_available
      };
      setFreeBikes(freeBikes => [...freeBikes, bike]);
    }
  };

  const handleClick = async () => {
    axios
      .get("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
      .then(response => {
        handleFreeBikes(response.data.data.stations);
        handleFreeDocks(response.data.data.stations);
      });
    const response = await axios.get(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
    );

    console.log(response.data.data.stations);
    handleStationName(response.data.data.stations);
  };

  const handleFreeDocks = result => {
    console.log(result[0]);
    let listOfDocks = [];
    for (let i = 0; i < result.length; i++) {
      let dock = {
        free_docks: result[i].num_docks_available
      };
      listOfDocks.push(dock);
    }
    setFreeDocks(listOfDocks);
    console.log(freeDocks);
  };

  const handleStationName = result => {
    for (let i = 0; i < result.length; i++) {
      setStationName(stationName => [...stationName, result[i].name]);
    }
    console.log(stationName);
    console.log("hallo");
  };

  const setNameWithDocksAndBikes = () => {
    console.log("stationNames: ", stationName);
    console.log("freeDocks", freeDocks);
    let listOfCompleteStations = [];
    for (let i = 0; i < stationName.length; i++) {
      let completeStation = {
        name: stationName[i],
        free_docks: freeDocks[i].free_docks,
        free_bikes: freeBikes[i].free_bikes
      };
      listOfCompleteStations.push(completeStation);
    }
    console.log("LOCS: ", listOfCompleteStations);
    setCompleteStations(listOfCompleteStations);
  };

  return (
    <div>
      <button onClick={handleClick}>Get all stations</button>
      <h1>Freedocks: {freeDocks.length}</h1>
      {completeStations.map(station => (
        <div style={{ maxWidth: 700 }}>
          <h2 style={{ backgroundColor: "#B3E5FC" }}>{station.name}</h2>
          <h3
            style={{
              backgroundColor: station.free_bikes > 0 ? "#81C784" : "#E57373"
            }}
          >
            {" "}
            Number of free bikes: {station.free_bikes}
          </h3>
          <h3
            style={{
              backgroundColor: station.free_docks > 0 ? "#81C784" : "#E57373"
            }}
          >
            Number of free docks: {station.free_docks}
          </h3>
        </div>
      ))}
    </div>
  );
};
export default Station;
