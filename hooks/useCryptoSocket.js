"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePrice } from "../store/websocketSlice";

const useCryptoSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      Object.keys(data).forEach((key) => {
        dispatch(updatePrice({ asset: key, price: parseFloat(data[key]) }));
      });
    };

    return () => socket.close();
  }, []);
};

export default useCryptoSocket;
