"use client"
import useCryptoSocket from "@/hooks/useCryptoSocket";
import WeatherSection from "../components/WeatherSection";
import CryptoSection from "../components/CryptoSection";
import NewsSection from "../components/NewsSection";
import RealTimeAlerts from "@/components/RealTimeAlerts";
import useWeatherAlerts from "@/hooks/useWeatherAlerts";
import FavoritesSection from "@/components/FavoriteSection";
import { useDispatch } from "react-redux";
import { clearFavorites } from "@/store/favoritesSlice";

export default function HomePage() {
  useCryptoSocket();
  useWeatherAlerts();

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear favorites from localStorage
    localStorage.removeItem("favorites");
    dispatch(clearFavorites());
  
    // Optionally: clear token, user session, etc.
    localStorage.removeItem("token");
  
    // Redirect to login or home page
    window.location.href = "/";
  };
  
  return (
    <main className="p-4 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">CryptoWeather Nexus 🌤️💰</h1>
      {/* <button onClick={handleLogout} className="right-end">Logout</button> */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>



      <WeatherSection />
      <CryptoSection /> 
      <NewsSection />
      <RealTimeAlerts /> 
      <FavoritesSection />

    </main>
  );
}
