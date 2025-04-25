
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
import FavoritesButton from "./FavoritesButton";
import Link from "next/link";
import { CloudSunIcon } from "lucide-react"; // Optional: install lucide-react

const cities = ["New York", "London", "Tokyo", "Paris"];

export default function WeatherSection() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeather(city)));
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-10">
      <div className="flex items-center gap-2 mb-6">
        <CloudSunIcon className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Weather Forecast</h2>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500 animate-pulse">Loading weather data...</div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {cities.map((city) => {
          const cityData = data[city.toLowerCase()];
          return (
            <div
              key={city}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">{city}</h3>
                <FavoritesButton name={city} type="city" item={city} />
              </div>

              {cityData ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Temp: <span className="font-medium">{cityData.main.temp}°C</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Humidity: <span className="font-medium">{cityData.main.humidity}%</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Condition:{" "}
                    <span className="capitalize font-medium">{cityData.weather[0].description}</span>
                  </p>
                  <Link
                    href={`/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    View Details →
                  </Link>
                </>
              ) : (
                <p className="text-gray-500 text-sm mt-4">Loading...</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
