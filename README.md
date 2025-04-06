# 🌐 CryptoWeather Nexus

A real-time multi-page dashboard built with **Next.js**, **Redux**, and **Tailwind CSS** to display weather, cryptocurrency data, and live notifications via WebSockets.

Live App: [https://cryptoweather-nexus-umber.vercel.app/]

---

## ✨ Features

- 🌤️ Weather data for 3 cities (New York, London, Tokyo)
- 💰 Crypto info for Bitcoin, Ethereum, and Dogecoin
- 📰 Top 5 crypto-related news headlines
- 🔔 Real-time notifications for price & weather alerts
- 📊 Detail pages with historical data (charts/tables)
- ⭐ Favorites feature for cities & coins
- 📱 Fully responsive and mobile-friendly

---

## 🧪 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/cryptoweather-nexus.git
cd cryptoweather-nexus
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local` File

```bash
touch .env.local
```

Add the following variables:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_key
```

> 💡 The CoinGecko API is public and requires no API key.

---

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000] in your browser.

---

### 5. Build for Production

```bash
npm run build
npm start
```

This will start a production server on port 3000.

---

## 📁 Folder Structure

```
/app
  /dashboard         → Main dashboard layout
  /crypto/[id]       → Dynamic route for crypto details
  /weather/[city]    → Dynamic route for city weather history
/components          → Reusable UI components
/store               → Redux store and slices
/utils               → API fetching utils
/hooks               → Price and weather alerts
/public              → Static assets (icons/images)
```

---

## 📡 Real-Time WebSocket Integration

- **CoinCap WebSocket** is used to fetch live BTC/ETH price updates.
- Custom WebSocket events simulate **weather alerts** at fixed intervals.
- Notifications are shown using `react-hot-toast` in the **top-right**.

Sample payloads:
```js
{
  type: 'price_alert',
  message: 'BTC increased by 2% in the last 5 minutes'
}

{
  type: 'weather_alert',
  message: 'Heavy rain alert in Tokyo'
}
```

---

## 💾 State Management (Redux)

Global state is managed using **Redux Toolkit** and includes:

- Weather and crypto data
- User favorites
- Alert messages
- Loading and error states

Favorites are also persisted using `localStorage`.

```js
favorites: {
  cities: ['London', 'Tokyo'],
  cryptos: ['bitcoin', 'ethereum']
}
```

---

## ⭐ Favorites Feature

Users can favorite any city or crypto via a ⭐ toggle icon.

- Favorites are stored in Redux and persisted via localStorage.
- Favorite items are highlighted or shown in a dedicated section.
- Upon reload, the favorite state is retained.

---

## 🧱 Design Decisions

| Decision | Reason |
| -------- | ------ |
| **Next.js App Router** | Enables clean routing structure and SSG for detail pages |
| **Tailwind CSS** | Fast, responsive UI building with consistent design |
| **Redux Toolkit** | Simplified and scalable state management |
| **react-hot-toast** | Easy-to-use, elegant toast notifications |
| **OpenWeatherMap & CoinGecko** | Reliable APIs with generous free tiers |

---

## ❗ Challenges Faced

- **Rate-limits** on free APIs required handling fallback states.
- **WebSocket testing** required simulated weather alerts.
- **CoinCap WebSocket integration** needed custom parsing and throttling.
- **State persistence** across refreshes handled via `localStorage`.

---

## ✅ Checklist for Assignment

| Requirement | Status |
| ----------- | ------ |
| Dashboard with weather, crypto, and news | ✅ |
| Detail pages with SSR/SSG | ✅ |
| WebSocket price alerts | ✅ |
| Simulated weather alerts | ✅ |
| Redux for global state | ✅ |
| Favorites system | ✅ |
| Responsive, styled with Tailwind | ✅ |
| Public deployment | ✅ |
| README with setup + decisions | ✅ |

---

## 📬 Contact

**Email**: asthas418@gmail.com

---

## 📄 License

This project is licensed under the MIT License.