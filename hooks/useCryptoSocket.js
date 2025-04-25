"use client";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function useCryptoPrice() {
  const lastPrices = useRef({ bitcoin: null, ethereum: null });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get("https://cryptoweather-nexus-br1l.onrender.com/api/crypto-prices");
        const prices = res.data;

        Object.entries(prices).forEach(([name, value]) => {
          const price = parseFloat(value);
          lastPrices.current[name] = price;

          // toast.success(`🔥 ${name.toUpperCase()} is now $${price.toFixed(5)}`, {
          //   icon: "💸",
          //   style: {
          //     borderRadius: "8px",
          //     background: "#333",
          //     color: "#fff",
          //   },
          // });
          toast(`📈 ${name.toUpperCase()} → $${price.toFixed(5)}`, {
            icon: "⚡",
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#1e1e1e",
              color: "#00ffae",
              fontWeight: "bold",
            },
          });
          

          console.log(`${name}: updated = ${price}`);
        });

      } catch (err) {
        console.error("❌ Error fetching prices:", err);
      }
    };

    const interval = setInterval(fetchPrices, 5000);
    fetchPrices(); // Initial call

    return () => clearInterval(interval);
  }, []);
}





