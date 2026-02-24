import { io } from "../index.js";

export function ws(socket) {
  console.log("socket connection", socket.id);

  const roomId = socket.handshake?.auth?.roomId;
  const username = socket.handshake?.auth?.username;
  socket.join(roomId);

  socket.on("scene-update", (data) => {
    socket.broadcast.to(roomId).emit("scene-update", data);
  });

  socket.on("cursor-position", (data) => {
    socket.broadcast.to(roomId).emit("cursor-position", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
}