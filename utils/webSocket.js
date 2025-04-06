export const connectToCoinCapWS = (callback) => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      callback(data);
    };
    return socket;
  };
  