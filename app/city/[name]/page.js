"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function CityDetailPage() {
  const { name } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual lat/lon if needed
  const cityCoords = {
    London: { lat: 51.5072, lon: -0.1276 },
    Tokyo: { lat: 35.6762, lon: 139.6503 },
    "New York": { lat: 40.7128, lon: -74.006 },
  };

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      const { lat, lon } = cityCoords[name] || {};
      if (!lat || !lon) return;

      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const now = Math.floor(Date.now() / 1000);
      const promises = [];

      // Fetch past 5 days data
      for (let i = 1; i <= 5; i++) {
        const dt = now - i * 86400;
        promises.push(
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}&units=metric`
          ).then((res) => res.json())
        );
      }

      const results = await Promise.all(promises);
      const formatted = results.map((day, index) => ({
        date: new Date(day.current.dt * 1000).toLocaleDateString(),
        temp: day.current.temp,
        humidity: day.current.humidity,
      }));

      setHistory(formatted.reverse());
      setLoading(false);
    }

    fetchHistory();
  }, [name]);

  if (loading) return <div className="text-center mt-10">Loading weather history...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Weather History - {name}</h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" name="Temp °C" />
          <Line type="monotone" dataKey="humidity" stroke="#10b981" name="Humidity %" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="text-xl font-semibold mt-10 mb-2">Table View</h2>
      <table className="w-full border border-gray-200 text-left text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Date</th>
            <th className="p-2">Temp (°C)</th>
            <th className="p-2">Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{entry.date}</td>
              <td className="p-2">{entry.temp}</td>
              <td className="p-2">{entry.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
