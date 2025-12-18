import { useCallback, useEffect, useRef, useState } from "react";

type WSStatus = "connecting" | "open" | "closed";

export const useWebSocket = <T = unknown>(
  url: string,
  reconnectInterval = 2000
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<T[]>([]);
  const [status, setStatus] = useState<WSStatus>("connecting");

  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Environment detection function
  const getEnvironment = () => {
    // Check for Vite
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return {
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD,
        mode: import.meta.env.MODE,
        vite: true,
      };
    }

    // Check for CRA/Node.js
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return {
        isDev: import.meta.env.NODE_ENV === "development",
        isProd: import.meta.env.NODE_ENV === "production",
        mode: import.meta.env.NODE_ENV,
        vite: false,
      };
    }

    // Fallback (assume development for safety)
    return {
      isDev: true,
      isProd: false,
      mode: "development",
      vite: false,
    };
  };

  const connect = () => {
    try {
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
        } catch (err) {
          console.error("Failed to parse WS message:", err);
        }
      };

      wsRef.current.onclose = () => {
        console.log("WS disconnected, retrying in", reconnectInterval, "ms");
        setStatus("closed");

        reconnectTimeout.current = setTimeout(connect, reconnectInterval);
      };

      wsRef.current.onerror = (event) => {
        const env = getEnvironment();

        if (env.isDev) {
          // Development mode: Show detailed error info
          console.debug("[WebSocket Debug] Error details:", {
            error: event,
            url: url,
            status: status,
            readyState: wsRef.current?.readyState,
            environment: env.mode,
            timestamp: new Date().toISOString(),
          });

          // Check for common errors to ignore
          const errorMessage = event?.toString() || "";
          const ignoredErrors = [
            "closed before the connection was established",
            "close before connect",
            "WebSocket is not open",
            "connection failed",
          ];

          const shouldIgnore = ignoredErrors.some((ignoredError) =>
            errorMessage.toLowerCase().includes(ignoredError.toLowerCase())
          );

          if (!shouldIgnore) {
            console.warn("[WebSocket Warning]", errorMessage);
          }
        } else {
          // Production mode: Only log critical errors
          const errorMessage = event?.toString() || "";
          const criticalErrors = [
            "certificate",
            "security",
            "authentication",
            "unauthorized",
            "failed",
            "error",
          ];

          const isCritical = criticalErrors.some((criticalError) =>
            errorMessage.toLowerCase().includes(criticalError.toLowerCase())
          );

          if (isCritical) {
            console.error("[WebSocket Error]", {
              message: errorMessage.substring(0, 200),
              url: url,
              status: status,
              timestamp: new Date().toISOString(),
            });
          }
        }
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      setStatus("closed");

      // Schedule reconnection on initialization error
      reconnectTimeout.current = setTimeout(connect, reconnectInterval);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = useCallback((msg: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(msg));
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      console.warn("WS not open. Message not sent:", msg);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const disconnect = () => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
    wsRef.current?.close();
  };

  return {
    messages,
    sendMessage,
    status,
    clearMessages,
    disconnect,
    isConnecting: status === "connecting",
    isOpen: status === "open",
    isClosed: status === "closed",
  };
};
