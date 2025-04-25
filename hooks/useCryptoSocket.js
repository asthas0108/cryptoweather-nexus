"use client";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function useCryptoPrice() {
  const lastPrices = useRef({ bitcoin: null, ethereum: null });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get("https://cryptoweather-nexus-br1l.onrender.com/api/crypto-prices");
        const prices = res.data;

        Object.entries(prices).forEach(([name, value]) => {
          const price = parseFloat(value);
          const last = lastPrices.current[name];

          // Show toast on any change (no threshold)
          if (last !== null && last !== price) {
            toast.success(`🔥 ${name.toUpperCase()} is now $${price.toFixed(2)}`, {
              icon: "💸",
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
                position: "bottom-right"
              },
            });
          }

          lastPrices.current[name] = price;

          console.log(`${name}: old = ${last}, new = ${price}`);
        });

      } catch (err) {
        console.error("❌ Error fetching prices:", err);
      }
    };

    const interval = setInterval(fetchPrices, 5000);
    fetchPrices(); // Initial call

    return () => clearInterval(interval);
  }, []);
}



// "use client";
// import { useEffect, useRef } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// export default function useCryptoPrice() {
//   const lastPrices = useRef({ bitcoin: null, ethereum: null });

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         // Fetch prices from the backend server
//         const res = await axios.get("http://localhost:5000/api/crypto-prices");

//         const { bitcoin, ethereum } = res.data;

//         // Handle price change for Bitcoin
//         if (bitcoin) {
//           const price = bitcoin.toFixed(2);
//           if (lastPrices.current.bitcoin && lastPrices.current.bitcoin !== price) {
//             toast.success(`🔥 BITCOIN is now $${price}`, {
//               icon: "💸",
//               style: {
//                 borderRadius: "8px",
//                 background: "#333",
//                 color: "#fff",
//                 position: "bottom-right"
//               },
//             });
//           }
//           lastPrices.current.bitcoin = price;
//         }

//         // Handle price change for Ethereum
//         if (ethereum) {
//           const price = ethereum.toFixed(2);
//           if (lastPrices.current.ethereum && lastPrices.current.ethereum !== price) {
//             toast.success(`🔥 ETHEREUM is now $${price}`, {
//               icon: "💸",
//               style: {
//                 borderRadius: "8px",
//                 background: "#333",
//                 color: "#fff",
//                 position: "bottom-right"
//               },
//             });
//           }
//           lastPrices.current.ethereum = price;
//         }

//       } catch (err) {
//         console.error("❌ Error fetching prices:", err);
//         toast.error("⚠️ Error fetching prices. Please try again later.");
//       }
//     };

//     // Fetch every 30 seconds (adjust the interval as needed)
//     const interval = setInterval(fetchPrices, 10000);
//     fetchPrices(); // Initial fetch

//     return () => clearInterval(interval);
//   }, []);
// }




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

// "use client";
// import { useEffect, useRef } from "react";
// import { toast } from "react-hot-toast";

// export default function useCryptoSocket() {
//   const ws = useRef(null);

//   useEffect(() => {
//     const url = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum";
//     ws.current = new WebSocket(url);
  
//     ws.current.onopen = () => {
//       console.log("✅ WebSocket connected to:", url);
//     };
  
//     ws.current.onmessage = (message) => {
//       console.log("📨 Message received:", message.data); // ✅ Add this for debugging
  
//       try {
//         const data = JSON.parse(message.data);
//         Object.entries(data).forEach(([coin, price]) => {
//           toast.success(`🔥 ${coin.toUpperCase()} is now $${Number(price).toFixed(2)}`, {
//             icon: "💸",
//             duration: 4000,
//             position: "bottom-right",
//             style: {
//               borderRadius: "8px",
//               background: "#333",
//               color: "#fff",
//             },
//           });
//         });
//       } catch (err) {
//         console.error("❌ Failed to parse WebSocket message:", message.data);
//       }
//     };
  
//     ws.current.onclose = (event) => {
//       console.warn(
//         `🔌 WebSocket closed (Code: ${event.code}, Reason: ${event.reason})`
//       );
//     };
  
//     return () => {
//       if (ws.current) {
//         console.log("🔁 Cleaning up WebSocket...");
//         ws.current.close();
//       }
//     };
//   }, []);
  

//   useEffect(() => {
//     const url = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum";
//     ws.current = new WebSocket(url);

//     ws.current.onopen = () => {
//       console.log("✅ WebSocket connected to:", url);
//     };

//     ws.current.onmessage = (message) => {
//       try {
//         const data = JSON.parse(message.data);
//         Object.entries(data).forEach(([coin, price]) => {
//           toast.success(`🔥 ${coin.toUpperCase()} is now $${Number(price).toFixed(2)}`, {
//             icon: "💸",
//             duration: 4000,
//             position: "bottom-right",
//             style: {
//               borderRadius: "8px",
//               background: "#333",
//               color: "#fff",
//             },
//           });
//         });
//       } catch (err) {
//         console.error("❌ Failed to parse WebSocket message:", message.data);
//       }
//     };

//     // ws.current.onerror = (event) => {
//     //   console.error("❌ WebSocket error event:", event);
//     //   toast.error("WebSocket connection error");
//     // };

//     ws.current.onclose = (event) => {
//       console.warn(
//         `🔌 WebSocket closed (Code: ${event.code}, Reason: ${event.reason})`
//       );
//     };

//     return () => {
//       if (ws.current) {
//         console.log("🔁 Cleaning up WebSocket...");
//         ws.current.close();
//       }
//     };
//   }, []);
// }








