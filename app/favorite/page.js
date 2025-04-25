"use client";
import FavoriteSection from "@/components/FavoriteSection";

export default function FavoritesPage () {
  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-teal-400 dark:to-cyan-300 mb-4">
        Your Favorites
      </h1>
      <FavoriteSection />
    </main>
  );
};


