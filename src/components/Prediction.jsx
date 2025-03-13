import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Prediction() {
    useEffect(() => {
        // Initialize the map
        const map = L.map("predictionWrap").setView([41.7151, 44.8271], 10); // Center on Tbilisi

        // Add OpenStreetMap tile layer (base map)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add OpenWeatherMap tile layer (e.g., temperature)
        const openWeatherMapUrl = "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e2233371759decd379d4cb354c92574a";
        L.tileLayer(openWeatherMapUrl, {
            attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        }).addTo(map);

        // Clean up the map when the component unmounts
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div
            id="predictionWrap"
            style={{
                width: "100%", // Occupy 100% of parent's width
                height: "100%", // Occupy 100% of parent's height
            }}
        ></div>
    );
}