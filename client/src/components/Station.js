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
    setNameWithDocksAndBikes();
  }, [stationName]);

  const handleFreeBikes = result => {
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
    axios
      .get(
        "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
      )
      .then(response => {
        handleStationName(response.data.data.stations);
      });
  };

  const handleFreeDocks = result => {
    let listOfDocks = [];
    for (let i = 0; i < result.length; i++) {
      let dock = {
        free_docks: result[i].num_docks_available
      };
      listOfDocks.push(dock);
    }
    setFreeDocks(listOfDocks);
  };

  const handleStationName = result => {
    let listOfStationNames = [];
    for (let i = 0; i < result.length; i++) {
      listOfStationNames.push(result[i].name);
    }
    setStationName(listOfStationNames);
  };

  const setNameWithDocksAndBikes = () => {
    let listOfCompleteStations = [];
    for (let i = 0; i < stationName.length; i++) {
      let completeStation = {
        name: stationName[i],
        free_docks: freeDocks[i].free_docks,
        free_bikes: freeBikes[i].free_bikes
      };
      listOfCompleteStations.push(completeStation);
    }
    setCompleteStations(listOfCompleteStations);
  };

  return (
    <div>
      <button onClick={handleClick}>Get all stations</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {completeStations.map(station => (
          <div style={{ maxWidth: 700, flex: "1 0 21%", margin: "8px" }}>
            <Card
              name={station.name}
              free_docks={station.free_docks}
              free_bikes={station.free_bikes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Station;
