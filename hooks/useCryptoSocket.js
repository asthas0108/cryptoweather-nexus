// "use client";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { updatePrice } from "../store/websocketSlice";

// const useCryptoSocket = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const socketUrl = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum";
//     let socket;

//     try {
//       socket = new WebSocket(socketUrl);

//       socket.onopen = () => {
//         console.log("✅ WebSocket connection opened.");
//       };

//       socket.onmessage = (msg) => {
//         try {
//           const data = JSON.parse(msg.data);
//           Object.keys(data).forEach((key) => {
//             dispatch(updatePrice({ asset: key, price: parseFloat(data[key]) }));
//           });
//         } catch (err) {
//           console.error("❌ JSON parse error:", err);
//         }
//       };

//       socket.onerror = (err) => {
//         console.error("❌ WebSocket error occurred:", err);
//       };

//       socket.onclose = (event) => {
//         console.warn("⚠️ WebSocket closed:", event);
//       };
//     } catch (err) {
//       console.error("❌ Failed to initialize WebSocket:", err);
//     }

//     return () => {
//       if (socket?.readyState === WebSocket.OPEN) {
//         socket.close();
//       }
//     };
//   }, [dispatch]);
// };

// export default useCryptoSocket;


// hooks/usePriceWebSocket.js

// "use client";
// import { useEffect, useRef } from "react";
// import { toast } from "react-hot-toast";

// export default function useCryptoSocket() {
//   const ws = useRef(null);

//   useEffect(() => {
//     const url = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum";
//     ws.current = new WebSocket(url);

//     ws.current.onmessage = (message) => {
//       const data = JSON.parse(message.data);

//       Object.entries(data).forEach(([coin, price]) => {
//         toast.success(`🔥 ${coin.toUpperCase()} is now $${Number(price).toFixed(2)}`, {
//           icon: "💸",
//           duration: 4000,
//         });
//         // You can dispatch to Redux here if needed
//       });
//     };

//     ws.current.onerror = (err) => {
//       console.error("WebSocket error:", err);
//       toast.error("WebSocket Error");
//     };

//     return () => {
//       ws.current.close();
//     };
//   }, []);
// }

"use client";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function useCryptoSocket() {
  const ws = useRef(null);

  useEffect(() => {
    const url = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum";
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected to:", url);
    };

    ws.current.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        Object.entries(data).forEach(([coin, price]) => {
          toast.success(`🔥 ${coin.toUpperCase()} is now $${Number(price).toFixed(2)}`, {
            icon: "💸",
            duration: 4000,
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
          });
        });
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", message.data);
      }
    };

    // ws.current.onerror = (event) => {
    //   console.error("❌ WebSocket error event:", event);
    //   toast.error("WebSocket connection error");
    // };

    ws.current.onclose = (event) => {
      console.warn(
        `🔌 WebSocket closed (Code: ${event.code}, Reason: ${event.reason})`
      );
    };

    return () => {
      if (ws.current) {
        console.log("🔁 Cleaning up WebSocket...");
        ws.current.close();
      }
    };
  }, []);
}

