
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../store/cryptoSlice";
import FavoritesButton from "./FavoritesButton";
import Link from "next/link";
import { BitcoinIcon } from "lucide-react"; // Optional icon from lucide-react

export default function CryptoSection() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCrypto());
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-10">
      <div className="flex items-center gap-2 mb-6">
        <BitcoinIcon className="w-6 h-6 text-yellow-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Crypto Prices</h2>
      </div>

      {loading && <p className="text-center text-gray-500 animate-pulse">Loading crypto data...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">{coin.name}</h3>
              <FavoritesButton item={coin.id} name={coin.id} type="crypto" />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Price:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                ${coin.current_price.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              24h Change:{" "}
              <span
                className={`font-medium ${
                  coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Market Cap:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                ${coin.market_cap.toLocaleString()}
              </span>
            </p>

            <Link
              href={`/crypto/${coin.id}`}
              className="text-blue-600 hover:underline text-sm mt-2 inline-block"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
