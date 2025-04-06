import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCrypto = createAsyncThunk("crypto/fetch", async () => {
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const response = await axios.get(url, {
    params: {
      vs_currency: "usd",
      ids: "bitcoin,ethereum,solana",
    },
  });
  return response.data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    coins: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.loading = false;
      })
      .addCase(fetchCrypto.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load crypto data";
      });
  },
});

export default cryptoSlice.reducer;
