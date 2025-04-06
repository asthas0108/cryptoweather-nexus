"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

const cities = ["New York", "London", "Tokyo"];

export default function WeatherSection() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeather(city)));
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">🌤️ Weather</h2>
      {loading && <p>Loading weather data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        {cities.map((city) => {
          const cityData = data[city.toLowerCase()];
          return (
            <div key={city} className="bg-white shadow rounded p-4">
              <h3 className="font-bold text-xl">{city}</h3>
              {cityData ? (
                <>
                  <p>Temp: {cityData.main.temp}°C</p>
                  <p>Humidity: {cityData.main.humidity}%</p>
                  <p>Condition: {cityData.weather[0].description}</p>
                  <Link href={`/city/${city}`}>
                    <p className="text-blue-600 hover:underline">View Details</p>
                  </Link>

                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{city.name}</h3>
                    <FavoriteButton name={city} type="city" />
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
