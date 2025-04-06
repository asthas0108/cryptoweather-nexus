import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherData } from "../utils/api";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const response = await getWeatherData(city);
    return { city, data: response.data };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { city, data } = action.payload;
        state.data[city.toLowerCase()] = data;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch weather";
      });
  },
});

export default weatherSlice.reducer;
