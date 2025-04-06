import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    prices: {
      bitcoin: null,
      ethereum: null,
    },
    previousPrices: {},
    alerts: [],
  },
  reducers: {
    updatePrice: (state, action) => {
      const { asset, price } = action.payload;

      const prev = state.prices[asset];
      if (prev) {
        const diff = ((price - prev) / prev) * 100;
        if (Math.abs(diff) > 2) {
          state.alerts.push({
            type: "price_alert",
            asset,
            diff: diff.toFixed(2),
            newPrice: price.toFixed(2),
            timestamp: Date.now(),
          });
        }
      }

      state.prices[asset] = price;
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

export const { updatePrice, clearAlerts } = websocketSlice.actions;
export default websocketSlice.reducer;
