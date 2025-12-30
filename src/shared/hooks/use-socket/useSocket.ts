import { useCallback, useEffect, useRef, useState } from "react";

type WSStatus = "connecting" | "open" | "closed";

export const useSocket = <T = unknown>(
  url: string,
  reconnectInterval = 2000
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<T[]>([]);
  // ✅ IMPORTANT: Track the single latest message to prevent reprocessing old data
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [status, setStatus] = useState<WSStatus>("connecting");

  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    try {
      // Prevent multiple connections
      if (wsRef.current?.readyState === WebSocket.OPEN) return;

      wsRef.current = new WebSocket(url);
      setStatus("connecting");

      wsRef.current.onopen = () => {
        console.log("WS connected");
        setStatus("open");
      };

      wsRef.current.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data) as T;
          setMessages((prev) => [...prev, msg]);
          // ✅ Overwrites the previous "lastMessage" with the new one
          setLastMessage(msg);
        } catch (err) {
          console.error("Failed to parse WS message:", err);
        }
      };

      wsRef.current.onclose = () => {
        console.log("WS disconnected, retrying...");
        setStatus("closed");
        reconnectTimeout.current = setTimeout(connect, reconnectInterval);
      };

      wsRef.current.onerror = () => {
        wsRef.current?.close();
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      setStatus("closed");
      reconnectTimeout.current = setTimeout(connect, reconnectInterval);
    }
  }, [url, reconnectInterval]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  return {
    messages,
    lastMessage,
    status,
    isOpen: status === "open",
  };
};
