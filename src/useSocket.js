// src/hooks/useSocket.js

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (url, options = {}) => {
  const socketRef = useRef();

  useEffect(() => {
    // Initialize the socket connection to the backend server on port 4000
    socketRef.current = io(url, options);

    // Handle connection events
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server", socketRef.current.id);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Disconnected from socket server", reason);
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [url, options]);

  return socketRef.current;
};

export default useSocket;
