/*
 *  socket.js - Socket.io configuration
 */

const BOT_NAME = "bot";

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
    // Send the message to the rest of the users
    socket.broadcast.emit("chat:actions", {
      by: BOT_NAME,
      message: `${socket.nickname} joined the chat`,
    });

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
        message: `${socket.nickname} is typing...`,
      });
    });
    // When user is not typing
    socket.on("chat:nottyping", () => {
      // Send the message to all the users
      socket.broadcast.emit("chat:nottyping", {
        message: "",
      });
    });

    // When the user disconnect
    socket.on("disconnect", () => {
      // Send the message to the rest of the users
      socket.broadcast.emit("chat:actions", {
        by: BOT_NAME,
        message: `${socket.nickname} left the chat`,
      });
    });
  });
};
