// "use client";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { clearAlerts } from "../store/websocketSlice";

// export default function RealTimeAlerts() {
//   const { alerts } = useSelector((state) => state.websocket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if(alerts.length > 0){
//         alerts.forEach((alert) => {
//             if (alert.type === "price_alert") {
//               toast(`${alert.asset.toUpperCase()} price changed by ${alert.diff}% — New: $${alert.newPrice}`, {
//                 icon: "💰",
//               });
//             }
//           });
//           dispatch(clearAlerts());
//     }
//   }, [alerts]);

//   return null;
// }


"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearAlerts } from "../store/websocketSlice";

export default function RealTimeAlerts() {
  const { alerts } = useSelector((state) => state.websocket);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("📡 RealTimeAlerts watching alerts:", alerts);
    if (alerts.length > 0) {
      alerts.forEach((alert) => {
        if (alert.type === "price_alert") {
          toast.success(
            `${alert.asset.toUpperCase()} moved ${alert.diff}% → $${alert.newPrice}`,
            {
              icon: "💸",
              duration: 4000,
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
              },
            }
          );
        }
      });
      dispatch(clearAlerts());
    }
  }, [alerts, dispatch]);

  return null;
}
