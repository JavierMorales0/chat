/*
 *  socket.js - Socket.io configuration
 */
export default (io) => {
  // Setting the namespace "chat"
  io.of("/chat").on("connection", (socket) => {
    // Verify if the user has nickname
    if (!socket.handshake.query.nickname) {
      // Disconnect the user
      socket.disconnect(true);
      return;
    }
    // Set the nickname
    socket.nickname = socket.handshake.query.nickname;
    console.log(`${socket.nickname} connected`);

    /*
     *  Configurating the events
     */

    // When the user send a message
    socket.on("chat:message", (data) => {
      // Setting the broadcast message to the room
      socket.broadcast.emit("message", {
        nickname: socket.nickname,
        message: data,
      });
    });

    // When user is typing
    socket.on("chat:typing", () => {
      // Send the message to all the users
      socket.broadcast.emit("chat:typing", {
        nickname: socket.nickname,
      });
    });
    // When user is not typing
    socket.on("chat:nottyping", () => {
      // Send the message to all the users
      socket.broadcast.emit("chat:nottyping", {
        nickname: socket.nickname,
      });
    });

    // When the user disconnect
    socket.on("disconnect", () => {
      console.log(`${socket.nickname} disconnected`);
    });
  });

  // Setting the namespace "orders"
  io.of("/orders").on("connection", (socket) => {
    console.log("A user connected with id " + socket.id);

    // Setting the disconnection event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
