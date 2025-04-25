// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFavoriteCity, toggleFavoriteCrypto } from "@/store/favoritesSlice";
// import { Star, StarOff } from "lucide-react";

// export default function FavoriteButton({ name, type }) {
//   const dispatch = useDispatch();
//   const favorites = useSelector((state) => state.favorites);

//   const isFav = type === "city"
//     ? favorites.cities.includes(name)
//     : favorites.cryptos.includes(name);

//   const handleClick = () => {
//     if (type === "city") {
//       dispatch(toggleFavoriteCity(name));
//     } else {
//       dispatch(toggleFavoriteCrypto(name));
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="ml-2 text-yellow-500 hover:scale-110 transition"
//       title={isFav ? "Unfavorite" : "Favorite"}
//     >
//       {isFav ? <Star /> : <StarOff />}
//     </button>
//   );
// }
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFavoriteCity, toggleFavoriteCrypto } from "@/store/favoritesSlice";

// const FavoritesButton = ({ item, type }) => {
//   const dispatch = useDispatch();
//   const favorites = useSelector((state) => state.favorites);

//   const isFavorite = type === "city"
//     ? favorites.cities.includes(item)
//     : favorites.cryptos.includes(item);

//   const handleToggle = () => {
//     if (type === "city") {
//       dispatch(toggleFavoriteCity(item));
//     } else {
//       dispatch(toggleFavoriteCrypto(item));
//     }
//   };

//   return (
//     <button
//       className={`px-3 py-1 rounded ${
//         isFavorite ? "bg-yellow-400" : "bg-gray-300"
//       }`}
//       onClick={handleToggle}
//     >
//       {isFavorite ? "★ Favorited" : "☆ Favorite"}
//     </button>
//   );
// };

// export default FavoritesButton;
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteCity, toggleFavoriteCrypto } from "@/store/favoritesSlice";
import { useEffect, useState } from "react";

const FavoritesButton = ({ item, type }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  // To prevent hydration mismatch, use client-side only state for determining the favorite status
  const [isMounted, setIsMounted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // This ensures we are on the client and the state is updated after the initial render
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only update the favorite state after the component is mounted on the client
    if (isMounted) {
      const favoriteStatus =
        type === "city"
          ? favorites.cities.includes(item)
          : favorites.cryptos.includes(item);
      setIsFavorite(favoriteStatus);
    }
  }, [favorites, item, type, isMounted]);

  const handleToggle = () => {
    if (type === "city") {
      dispatch(toggleFavoriteCity(item));
    } else {
      dispatch(toggleFavoriteCrypto(item));
    }
  };

  // Wait for the component to be mounted before rendering the button
  if (!isMounted) return null;

  return (
    <button
      className={`px-3 py-1 rounded ${isFavorite ? "bg-yellow-400" : "bg-gray-300"}`}
      onClick={handleToggle}
    >
      {isFavorite ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
};

export default FavoritesButton;
