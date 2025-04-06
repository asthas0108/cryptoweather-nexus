import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import cryptoReducer from './cryptoSlice';
import newsReducer from './newsSlice';
import websocketReducer from "./websocketSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    websocket: websocketReducer,
    favorites: favoritesReducer,
  },
});

store.subscribe(() => {
  const { favorites } = store.getState();
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});

export default store;
