import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Station = () => {
  const [freeBikes, setFreeBikes] = useState([]);
  const [freeDocks, setFreeDocks] = useState([]);

  useEffect(async () => {
    const response = await axios(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
    );
    setFreeBikes([]);
    setFreeDocks([]);
    handleFreeBikes(response.data.data.stations);
    handleFreeDocks(response.data.data.stations);
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
  return (
    <div>
      <ul>
        {freeDocks.map(dock => (
          <li>{dock.free_docks}</li>
        ))}
      </ul>
    </div>
  );
};
export default Station;
