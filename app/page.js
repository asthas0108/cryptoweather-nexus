"use client";

import useCryptoSocket from "@/hooks/useCryptoSocket";
import useWeatherAlerts from "@/hooks/useWeatherAlerts";
import { useDispatch } from "react-redux";
import { clearFavorites } from "@/store/favoritesSlice";
import WeatherSection from "@/components/WeatherSection";
import CryptoSection from "@/components/CryptoSection";
import NewsSection from "@/components/NewsSection";
import RealTimeAlerts from "@/components/RealTimeAlerts";
import FavoritesSection from "@/components/FavoriteSection";
import { LogOutIcon, StarIcon  } from "lucide-react"; // Optional icon
import Link from "next/link";

export default function HomePage() {
  useCryptoSocket();
  useWeatherAlerts();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("favorites");
    dispatch(clearFavorites());
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen  p-6 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-teal-400 dark:to-cyan-300">
          CryptoWeather Nexus
        </h1>
        <div className="flex gap-4">
          <Link
            href="/favorite"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-xl shadow transition duration-300"
          >
            <StarIcon className="w-5 h-5" />
            Favorites
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-300"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Sections */}
      <section className="space-y-10">
        <WeatherSection />
        <CryptoSection />
        <NewsSection />
        <RealTimeAlerts />
        {/* <FavoritesSection /> */}
      </section>
    </main>
  );
}
