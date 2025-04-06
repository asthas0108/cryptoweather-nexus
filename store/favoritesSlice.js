import { createSlice } from "@reduxjs/toolkit";

// add persisting feature
const savedFavorites = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("favorites")) || { cities: [], cryptos: [] }
  : { cities: [], cryptos: [] };


const favoritesSlice = createSlice({
  name: "favorites",
  initialState: savedFavorites,
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      if (state.cryptos.includes(crypto)) {
        state.cryptos = state.cryptos.filter((c) => c !== crypto);
      } else {
        state.cryptos.push(crypto);
      }
    },
    loadFavoritesFromStorage: (state, action) => {
      return action.payload;
    },
    clearFavorites: (state) => {
      state.cities = [];
      state.cryptos = [];
    }
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto, loadFavoritesFromStorage, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
