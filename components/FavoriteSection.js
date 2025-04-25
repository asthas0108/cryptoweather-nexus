
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadFavoritesFromStorage } from "../store/favoritesSlice";
import { StarIcon, MapPinIcon, BitcoinIcon } from "lucide-react"; // Using Lucide icons

const FavoritesSection = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const { cities, cryptos } = useSelector((state) => state.favorites);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      dispatch(loadFavoritesFromStorage(JSON.parse(favorites)));
    }
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="p-6 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <StarIcon className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">Your Favorites</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Favorite Cities */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPinIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-700">Cities</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {cities.length > 0 ? (
              cities.map((c) => <li key={c} className="ml-2">{c}</li>)
            ) : (
              <p className="text-gray-500 italic ml-2">No cities favorited.</p>
            )}
          </ul>
        </div>

        {/* Favorite Cryptos */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <BitcoinIcon className="w-5 h-5 text-yellow-600" />
            <h3 className="text-xl font-semibold text-gray-700">Cryptos</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {cryptos.length > 0 ? (
              cryptos.map((c) => <li key={c} className="ml-2">{c}</li>)
            ) : (
              <p className="text-gray-500 italic ml-2">No cryptos favorited.</p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FavoritesSection;
