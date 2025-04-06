import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadFavoritesFromStorage } from "../store/favoritesSlice";

const FavoritesSection = () => {
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false);
  const { cities, cryptos } = useSelector((state) => state.favorites);

  useEffect(() => {
    // Only runs on client
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      dispatch(loadFavoritesFromStorage(JSON.parse(favorites)));
    }
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="p-4 bg-white shadow-md rounded mt-6">
      <h2 className="text-lg font-semibold mb-3">Your Favorites</h2>
      <div>
        <p className="font-medium">Cities:</p>
        <ul className="list-disc list-inside">
          {cities.length > 0 ? cities.map((c) => <li key={c}>{c}</li>) : <p>No cities favorited.</p>}
        </ul>
      </div>
      <div className="mt-3">
        <p className="font-medium">Cryptos:</p>
        <ul className="list-disc list-inside">
          {cryptos.length > 0 ? cryptos.map((c) => <li key={c}>{c}</li>) : <p>No cryptos favorited.</p>}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesSection;
