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
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteCity, toggleFavoriteCrypto } from "@/store/favoritesSlice";

const FavoritesButton = ({ item, type }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = type === "city"
    ? favorites.cities.includes(item)
    : favorites.cryptos.includes(item);

  const handleToggle = () => {
    if (type === "city") {
      dispatch(toggleFavoriteCity(item));
    } else {
      dispatch(toggleFavoriteCrypto(item));
    }
  };

  return (
    <button
      className={`px-3 py-1 rounded ${
        isFavorite ? "bg-yellow-400" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      {isFavorite ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
};

export default FavoritesButton;
