"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function CityDetailPage() {
  const { name } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cityCoords = {
    London: { lat: 51.5072, lon: -0.1276 },
    Tokyo: { lat: 35.6762, lon: 139.6503 },
    "New York": { lat: 40.7128, lon: -74.006 },
  };

  const getCityKey = (slug) => {
    return Object.keys(cityCoords).find(
      (city) => city.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
    );
  };

  useEffect(() => {
    async function fetchHistory() {
      const cityKey = getCityKey(name);
      if (!cityKey) {
        setError("City not found.");
        setLoading(false);
        return;
      }

      const { lat, lon } = cityCoords[cityKey];
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const promises = [];

      for (let i = 1; i <= 5; i++) {
        promises.push(
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          ).then((res) => res.json())
        );
      }

      try {
        const results = await Promise.all(promises);
        const formatted = results.map((day) => ({
          date: new Date(day.dt * 1000).toLocaleDateString(),
          temp: day.main.temp,
          humidity: day.main.humidity,
        }));

        setHistory(formatted.reverse());
      } catch (err) {
        setError("Failed to fetch weather data.");
      }

      setLoading(false);
    }

    fetchHistory();
  }, [name]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <span className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
        <span className="ml-4 text-lg font-medium">Loading weather history...</span>
      </div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-500 text-lg">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Weather History – {getCityKey(name)}
        </h1>
        <p className="mt-2 text-sm">Last 5 Days (Temperature & Humidity)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={history}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }} />
            <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} name="Temp °C" />
            <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={2} name="Humidity %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Table View</h2>
        <table className="w-full table-auto border-collapse text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Temp (°C)</th>
              <th className="p-3 text-left">Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, i) => (
              <tr key={i} className="hover:bg-gray-50 border-t">
                <td className="p-3">{entry.date}</td>
                <td className="p-3">{entry.temp}</td>
                <td className="p-3">{entry.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
