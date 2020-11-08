import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./StylingCard";

const Station = () => {
  const [freeBikes, setFreeBikes] = useState([]); //a state the contains all stations number of free bikes
  const [freeDocks, setFreeDocks] = useState([]); //a state that contains all stations number of free docks
  const [stationName, setStationName] = useState([]); //a state that contains all station names
  const [completeStations, setCompleteStations] = useState([]); //a state that contains all station names, number of free bikes and number of free docks

  useEffect(() => {
    //Re-renders everytime stationName is changed
    setNameWithDocksAndBikes();
  }, [stationName]);

  const handleClick = async () => {
    //fetches the data that contains the number of free bikes and docks
    axios
      .get("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
      .then(response => {
        handleFreeBikes(response.data.data.stations);
        handleFreeDocks(response.data.data.stations);
      });
    axios
      .get(
        "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json" //fetches the data that contains allk the station names
      )
      .then(response => {
        handleStationName(response.data.data.stations);
      });
  };

  const handleFreeBikes = result => {
    //Creates an object with the attribute free_bikes. Adds all the stations free bikes to a list and set freeBikes as this list.
    for (let i = 0; i < result.length; i++) {
      let listOfBikes = [];
      let bike = {
        free_bikes: result[i].num_bikes_available //Creates an object for each station with the number of free bikes at the current station.
      };
      listOfBikes.push(bike);
    }
    setFreeBikes(listOfBikes);
  };
  const handleFreeDocks = result => {
    //Creates an object with the attribute free_docks. Adds all the stations free docks to a list  and set freeDocks as this list.
    let listOfDocks = [];
    for (let i = 0; i < result.length; i++) {
      let dock = {
        free_docks: result[i].num_docks_available //Creates an object for each station with the number of free docks at the current station.
      };
      listOfDocks.push(dock);
    }
    setFreeDocks(listOfDocks);
  };

  const handleStationName = result => {
    //Adds all the station names to a list and sets stationName to this list
    let listOfStationNames = [];
    for (let i = 0; i < result.length; i++) {
      listOfStationNames.push(result[i].name);
    }
    setStationName(listOfStationNames);
  };

  const setNameWithDocksAndBikes = () => {
    //Makes a complete list of all stations with station name, number of free bikes and number of free bikes
    let listOfCompleteStations = [];
    for (let i = 0; i < stationName.length; i++) {
      let completeStation = {
        //Creates an object for each station with the stations name, number of free bikes and free docks
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
