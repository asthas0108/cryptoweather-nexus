"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearAlerts } from "../store/websocketSlice";

export default function RealTimeAlerts() {
  const { alerts } = useSelector((state) => state.websocket);
  const dispatch = useDispatch();

  useEffect(() => {
    if(alerts.length > 0){
        alerts.forEach((alert) => {
            if (alert.type === "price_alert") {
              toast(`${alert.asset.toUpperCase()} price changed by ${alert.diff}% — New: $${alert.newPrice}`, {
                icon: "💰",
              });
            }
          });
          dispatch(clearAlerts());
    }
  }, [alerts]);

  return null;
}
