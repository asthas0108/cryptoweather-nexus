const express = require("express");
const axios = require("axios");
const cors = require("cors"); // 👈 import cors
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use cors middleware
app.use(cors()); // 👈 This allows all origins. You can customize it if needed.

app.get("/api/crypto-prices", async (req, res) => {
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
        'Accept': 'application/json',
      }
    });

    const bitcoin = response.data.data.find(coin => coin.symbol === 'BTC');
    const ethereum = response.data.data.find(coin => coin.symbol === 'ETH');

    res.json({
      bitcoin: bitcoin ? bitcoin.quote.USD.price : null,
      ethereum: ethereum ? ethereum.quote.USD.price : null
    });

  } catch (err) {
    console.error("❌ Error fetching prices:", err);
    res.status(500).json({ error: "Error fetching prices" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
