import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./StylingCard";

const Station = () => {
  const [freeBikes, setFreeBikes] = useState([]);
  const [freeDocks, setFreeDocks] = useState([]);
  const [stationName, setStationName] = useState([]);
  const [completeStations, setCompleteStations] = useState([]);

  useEffect(async () => {
    const response = await axios(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
    );
    setFreeBikes([]);
    setFreeDocks([]);
    handleFreeBikes(response.data.data.stations);
    handleFreeDocks(response.data.data.stations);
  }, []);

  useEffect(async () => {
    const response = await axios(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
    );
    console.log(response.data.data.stations);
    setStationName([]);
    setCompleteStations([]);
    handleStationName(response.data.data.stations);
    setNameWithDocksAndBikes();
  }, []);

  const handleFreeBikes = result => {
    console.log(result[0]);
    for (let i = 0; i < result.length; i++) {
      let bike = {
        free_bikes: result[i].num_bikes_available
      };
      setFreeBikes(freeBikes => [...freeBikes, bike]);
    }
  };

  const handleFreeDocks = result => {
    console.log(result[0]);
    for (let i = 0; i < result.length; i++) {
      let dock = {
        free_docks: result[i].num_docks_available
      };
      setFreeDocks(freeDocks => [...freeDocks, dock]);
    }
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
    for (let i = 0; i < stationName.length; i++) {
      let completeStation = {
        name: stationName[i],
        free_docks: freeDocks[i].free_docks,
        free_bikes: freeBikes[i].free_bikes
      };
      setCompleteStations(completeStations => [
        ...completeStations,
        completeStation
      ]);
    }
    console.log(completeStations);
  };

  return (
    <div>
      {completeStations.map(station => (
        <div>
          <Card
            name={station.name}
            free_bikes={station.free_bikes}
            free_docks={station.free_docks}
          />
        </div>
      ))}
    </div>
  );
};
export default Station;
