// hooks/useWeatherAlerts.js
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const cities = ["New York", "London", "Tokyo"];
const alerts = [
  "Heavy Rain",
  "Thunderstorm Warning",
  "High Winds",
  "Heatwave Alert",
  "Snowstorm Incoming",
  "Foggy Conditions",
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function useWeatherAlerts() {
  useEffect(() => {
    const interval = setInterval(() => {
      const city = getRandomItem(cities);
      const alert = getRandomItem(alerts);
      const message = `⚠️ Weather Alert for ${city}: ${alert}`;

      toast(message, {
        icon: "🌦️",
        duration: 5000,
        position: "top-right",
        style: {
          background: "#facc15", // yellow
          color: "#000",
        },
      });

      // Optionally dispatch to Redux store here
    }, Math.random() * (60000 - 30000) + 30000); // 30–60s interval

    return () => clearInterval(interval);
  }, []);
}
