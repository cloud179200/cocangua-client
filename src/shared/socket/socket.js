import io from "socket.io-client";
let socket;
export const initiateSocket = () => {
  const token = localStorage.getItem("token_seahorsechessapp");
  if (token) {
    socket = io(process.env.REACT_APP_BE_URL, { query: { token } });
    console.log(`Connecting socket...`);
    socket && console.log("Connect success...");
  }
};
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const subscribeToChat = (cb) => {
  if (!socket) return true;
  socket.on("new-message", (msg) => {
    console.log("Websocket event received!");
    return cb(null, msg);
  });
};
export const sendMessage = (roomId, content) => {
  try {
    const token = localStorage.getItem("token_seahorsechessapp");
    if (token && roomId && content)
      socket.emit("send-message", { rid: roomId, content, token });
  } catch (err) {
    console.log(err);
  }
};
export const joinRoomWithSocket = (roomId) => {
  const token = localStorage.getItem("token_seahorsechessapp");
  if (token && socket) socket.emit("join-room", { rid: roomId, token });
};
export const exitRoomWithSocket = (roomId) => {
  const token = localStorage.getItem("token_seahorsechessapp");
  if (token && socket) socket.emit("exit-room", { rid: roomId, token });
};
export const subscribeToRoom = (cb) => {
  if (!socket) return true;
  socket.on("update-room", (data) => {
    console.log("update-room");
    return cb(null, data);
  });
};
