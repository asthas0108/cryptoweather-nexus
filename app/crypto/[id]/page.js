"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CryptoDetailPage() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const priceRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const priceData = await priceRes.json();

        if (!priceData.prices) throw new Error("Price data not found.");

        const formattedHistory = priceData.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: parseFloat(price.toFixed(2)),
        }));

        const infoRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const infoData = await infoRes.json();

        if (!infoData.market_data) throw new Error("Market data not available.");

        setInfo({
          name: infoData.name,
          symbol: infoData.symbol.toUpperCase(),
          marketCap: infoData.market_data.market_cap.usd,
          volume: infoData.market_data.total_volume.usd,
          currentPrice: infoData.market_data.current_price.usd,
          image: infoData.image.large,
        });

        setHistory(formattedHistory);
      } catch (err) {
        console.error("Error fetching crypto data:", err);
        setError("Failed to fetch crypto data.");
      }

      setLoading(false);
    }

    if (id) fetchData();
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-gray-500 text-lg">Loading crypto data...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-600 text-lg">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-3xl p-6 md:p-10 border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          {info?.image && (
            <img src={info.image} alt={info.name} className="w-14 h-14" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {info?.name} ({info?.symbol})
            </h1>
            <p className="text-xl text-gray-600 mt-1">
              💰 Current Price:{" "}
              <span className="text-green-600 font-semibold">
                ${info?.currentPrice?.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">7-Day Price Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">📊 Market Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p>
                <strong>Market Cap:</strong><br />
                <span className="text-blue-600 font-medium">${info.marketCap.toLocaleString()}</span>
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p>
                <strong>24h Volume:</strong><br />
                <span className="text-purple-600 font-medium">${info.volume.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
