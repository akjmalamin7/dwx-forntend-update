// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// export const useDemoSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const wsUrl = import.meta.env.VITE_WS_URL;
//   useEffect(() => {
//     const newSocket = io(wsUrl);
//     setSocket(newSocket);
//     return () => {
//       newSocket.close();
//     };
//   }, []);
//   return {
//     socket,
//     io,
//   };
// };
