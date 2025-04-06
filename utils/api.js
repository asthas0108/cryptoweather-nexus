import axios from 'axios';

export const getWeatherData = async (city) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  return axios.get(url);
};

export const getCryptoData = async () => {
  return axios.get("https://api.coingecko.com/api/v3/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: "bitcoin,ethereum,solana",
    }
  });
};

export const getNewsData = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  return axios.get(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency`);
};
