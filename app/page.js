"use client"
import useCryptoSocket from "@/hooks/useCryptoSocket";
import WeatherSection from "../components/WeatherSection";
import CryptoSection from "../components/CryptoSection";
import NewsSection from "../components/NewsSection";
import RealTimeAlerts from "@/components/RealTimeAlerts";

export default function HomePage() {
  useCryptoSocket();
  return (
    <main className="p-4 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">CryptoWeather Nexus 🌤️💰</h1>

      <WeatherSection />
      <CryptoSection /> 
      <NewsSection />
      <RealTimeAlerts /> 
    </main>
  );
}
