import { io } from "socket.io-client";
const token = localStorage.getItem("token_seahorsechessapp");
export const socket = io.connect(process.env.REACT_APP_BE_URL, {
  query: { token },
});
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const sendMessage = (roomId, content) => {
  const token = localStorage.getItem("token_seahorsechessapp");
  if (token && roomId && content)
    socket.emit("send-message", { rid: roomId, content, token });
};
