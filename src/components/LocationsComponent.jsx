import { useState, useEffect } from "react";
import axios from "axios";

export default function LocationsComponent({ name, imageSrc }) {
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "e2233371759decd379d4cb354c92574a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
  console.log("API URL: ", apiUrl);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setTemp(response.data.main.temp);
        setError(null);
      })
      .catch((err) => {
        setError("City not found or unable to fetch data.");
        setTemp(null);
      });
  }, [name]);

  return (
    <div id="locationDiv">
      <img id="locationImage" src={imageSrc} alt={name} />
      <div id="locationRight">
        <p id="locationName" className="font">{name}</p>
        {temp !== null ? (
          <p id="temperature" className="font">{temp}°C</p>
        ) : (
          <p id="temperature" className="font">{error ? error : "Loading..."}</p>
        )}
      </div>
    </div>
  );
}
