"use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";

// export default function CryptoDetailPage() {
//   const { id } = useParams(); // e.g., "bitcoin"
//   const [history, setHistory] = useState([]);
//   const [info, setInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         // Fetch historical prices (7 days)
//         const priceRes = await fetch(
//           `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
//         );
//         const priceData = await priceRes.json();

//         const formattedHistory = priceData.prices.map(([timestamp, price]) => ({
//           date: new Date(timestamp).toLocaleDateString(),
//           price: price.toFixed(2),
//         }));

//         // Fetch current info
//         const infoRes = await fetch(
//           `https://api.coingecko.com/api/v3/coins/${id}`
//         );
//         const infoData = await infoRes.json();

//         setInfo({
//           name: infoData.name,
//           symbol: infoData.symbol.toUpperCase(),
//           marketCap: infoData.market_data.market_cap.usd,
//           volume: infoData.market_data.total_volume.usd,
//           currentPrice: infoData.market_data.current_price.usd,
//         });

//         setHistory(formattedHistory);
//       } catch (err) {
//         console.error("Error fetching crypto data:", err);
//       }
//       setLoading(false);
//     }

//     if (id) fetchData();
//   }, [id]);

//   if (loading) return <div className="text-center mt-10">Loading crypto data...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-2">
//         {info?.name} ({info?.symbol})
//       </h1>
//       <p className="text-lg mb-6">Current Price: ${info?.currentPrice}</p>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={history}>
//           <CartesianGrid stroke="#ccc" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="price" stroke="#f59e0b" name="Price USD" />
//         </LineChart>
//       </ResponsiveContainer>

//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-2">Market Details</h2>
//         <ul className="list-disc ml-6 space-y-1 text-sm">
//           <li><strong>Market Cap:</strong> ${info.marketCap.toLocaleString()}</li>
//           <li><strong>24h Volume:</strong> ${info.volume.toLocaleString()}</li>
//         </ul>
//       </div>
//     </div>
//   );
// }


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
//   const { id } = useParams(); // e.g., "bitcoin"
    const params = useParams();
    const id = params.id; 

  const [history, setHistory] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    console.log("Crypto ID from URL:", id);
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        // Fetch historical prices (7 days)
        const priceRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const priceData = await priceRes.json();

        if (!priceData.prices) {
          throw new Error("Price data not found.");
        }

        const formattedHistory = priceData.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: price.toFixed(2),
        }));

        // Fetch current info
        const infoRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const infoData = await infoRes.json();

        if (!infoData.market_data) {
          throw new Error("Market data not available.");
        }

        setInfo({
          name: infoData.name,
          symbol: infoData.symbol.toUpperCase(),
          marketCap: infoData.market_data.market_cap.usd,
          volume: infoData.market_data.total_volume.usd,
          currentPrice: infoData.market_data.current_price.usd,
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

  if (loading) return <div className="text-center mt-10">Loading crypto data...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">
        {info?.name} ({info?.symbol})
      </h1>
      <p className="text-lg mb-6">Current Price: ${info?.currentPrice}</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#f59e0b"
            name="Price USD"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Market Details</h2>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li>
            <strong>Market Cap:</strong>{" "}
            ${info.marketCap.toLocaleString()}
          </li>
          <li>
            <strong>24h Volume:</strong>{" "}
            ${info.volume.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
}
