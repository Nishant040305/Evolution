import {socket} from "../scripts/socket";
import { useEffect, useState } from "react";
export const useSocketConnect = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });
  }, []);

  return connected;
};