"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../store/cryptoSlice";
import FavoritesButton from "./FavoritesButton";
import Link from "next/link";

export default function CryptoSection() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCrypto());
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">💰 Crypto Prices</h2>
      {loading && <p>Loading crypto data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-xl">{coin.name}</h3>
            <p>Price: ${coin.current_price.toLocaleString()}</p>
            <p>24h Change: 
              <span className={coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>

            <Link href={`/crypto/${coin.id}`}>
              <p className="text-blue-600 hover:underline">View Details</p>
            </Link>


            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold"></h3>
              <FavoritesButton item={coin.id} name={coin.id} type="crypto" />
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
