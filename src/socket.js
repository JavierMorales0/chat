import { addUser, removeUser } from "./db/localDatabase.js";

/*
 *  socket.js - Socket.io configuration
 */

const BOT_NAME = "bot";

export default (io) => {
  // Setting the namespace "chat"
  io.of("/chat").on("connection", (socket) => {
    // Verify if the user has username
    if (!socket.handshake.query.username) {
      // Disconnect the user
      socket.disconnect(true);
      return;
    }
    // Set the username
    socket.username = socket.handshake.query.username;
    // Add to online users
    addUser(socket.username, socket.id);
    console.log(`${socket.username} connected`);

    // Send the message to the rest of the users
    socket.broadcast.emit("chat:actions", {
      by: BOT_NAME,
      message: `${socket.username} joined the chat`,
    });

    /*
     *  Configurating the events
     */

    // When the user send a message
    socket.on("chat:message", (data) => {
      // Setting the broadcast message to the room
      socket.broadcast.emit("chat:message", {
        username: socket.username,
        message: data,
      });
    });

    // When user is typing
    socket.on("chat:typing", () => {
      // Send the message to all the users
      socket.broadcast.emit("chat:typing", {
        message: `${socket.username} is typing...`,
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
      // Remove from online users
      removeUser(socket.id);
      // Send the message to the rest of the users
      socket.broadcast.emit("chat:actions", {
        by: BOT_NAME,
        message: `${socket.username} left the chat`,
      });
    });
  });
};
