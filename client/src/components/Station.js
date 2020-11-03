import React from "react";
import { useState, useEffect } from "react";

const Station = () => {
  const [freeBikes, setFreeBikes] = useState({});
  const [freeDocks, setFreeDocks] = useState({});

  useEffect(() => {
    fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
      .then(res => res.json())
      .then(result => {
        setFreeBikes([]);
        setFreeDocks([]);
        handleFreeDocks(result.data.stations);
        handleFreeBikes(result.data.stations);
      });
  }, []);

  const handleFreeBikes = result => {
    for (var i = 0; i < result.length; i++) {
      setFreeBikes(freeBikes => [
        ...freeBikes,
        { ["free_bikes"]: result[i].num_bikes_available }
      ]);
    }
    console.log(freeBikes);
    console.log("hei");
  };

  const handleFreeDocks = result => {
    for (var i = 0; i < result.length; i++) {
      setFreeDocks(freeDocks => [
        ...freeDocks,
        { ["free_docks"]: result[i].num_docks_available }
      ]);
    }
    console.log(freeDocks);
    console.log("hallo");
  };

  return (
    <div>
      <h1>HALLA PÅ BALLA</h1>
    </div>
  );
};
export default Station;
