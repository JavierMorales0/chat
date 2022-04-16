/*
 *  socket.js - Socket.io configuration
 */
export default (io) => {
  // Setting the socket.io configuration
  io.on("connection", (socket) => {
    console.log("A user connected with id " + socket.id);
    // Setting the disconnection event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
