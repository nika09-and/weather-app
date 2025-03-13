import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faMoon, faCloud, faSun, faBolt, faSnowflake, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import infoIcon from '../assets/infoIcon.svg';
import dayImage from '../assets/dayTime-01.svg';
import nightImage from '../assets/nightTime-01.svg';
import Prediction from "./Prediction.jsx"


export default function MainRight() {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }));
    const [temperature, setTemperature] = useState(null);
    const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(null);
    const [weatherStatus, setWeatherStatus] = useState("");
    const [weatherIcon, setWeatherIcon] = useState(faCloudSun);
    const [dayStatus, setDayStatus] = useState("Day time");
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(nightImage);

    const city = "Tbilisi";
    const apiKey = "e2233371759decd379d4cb354c92574a";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const updateDayNightStatus = () => {
        const now = new Date();
        const currentUnixTime = Math.floor(now.getTime() / 1000);

        if (sunrise && sunset) {
            if (currentUnixTime >= sunrise && currentUnixTime < sunset) {
                setDayStatus("Day time");
                setBackgroundImage(dayImage);
            } else {
                setDayStatus("Night time");
                setBackgroundImage(nightImage);
            }
        }
    };

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                setTemperature(data.main.temp);
                setFeelsLikeTemperature(data.main.feels_like);
                setWeatherStatus(data.weather[0].description);

                setSunrise(data.sys.sunrise);
                setSunset(data.sys.sunset);

                const condition = data.weather[0].main.toLowerCase();
                if (condition.includes("clear")) setWeatherIcon(faSun);
                else if (condition.includes("cloud")) setWeatherIcon(faCloud);
                else if (condition.includes("rain")) setWeatherIcon(faCloudRain);
                else if (condition.includes("thunderstorm")) setWeatherIcon(faBolt);
                else if (condition.includes("snow")) setWeatherIcon(faSnowflake);
                else setWeatherIcon(faCloudSun);
            })
            .catch(() => {
                setWeatherStatus("Unable to fetch data");
                setTemperature("--");
                setFeelsLikeTemperature("--");
            });
    }, []);

    useEffect(() => {
        const today = new Date();
        const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
        setCurrentDate(today.toLocaleDateString("en-US", options));
    }, []);

    useEffect(() => {
        if (sunrise && sunset) {
            updateDayNightStatus();
        }
    }, [sunrise, sunset]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }));
            updateDayNightStatus();
        }, 60000);

        return () => clearInterval(interval);
    }, [sunrise, sunset]);

    return (
        <div id="righSide">
            <div id="mainWeatherWindow">
                <div id="bigLeft">
                    <div id="bigHeaders">
                        <h1 className="header" id="bigCityName">{city}</h1>
                        <p id="subheader" className="font">{currentDate}</p>
                    </div>
                    <div id="weatherIndicatorImage">
                        <FontAwesomeIcon icon={weatherIcon} size="10x" />
                    </div>
                </div>
                <div id="bigRight">
                    <div id="iconButton">
                        <button id="buttonForIcons">
                            <img src={infoIcon} id="infoIcon" alt="Info Icon" />
                            <p className="font" id="iconText">Icons</p>
                        </button>
                    </div>
                    <div id="bigInfo">
                        <p id="mainTemperature" className="font">{temperature}°C</p>
                        <p id="feelsLikeTemperature" className="font">
                            Feels like: {feelsLikeTemperature}°C
                        </p>
                        <p id="weatherStatus" className="font">{weatherStatus}</p>
                    </div>
                </div>
            </div>
            <div
                id="weatherImage"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '200px',
                }}
            >
                <div id="imageInfo">
                    <p className="font" id="dayStatus">{dayStatus} in {city}</p>
                    <p className="font header">{currentTime}</p>
                </div>
            </div>
            <div id="prediction"><Prediction /></div>
        </div>
    );
}