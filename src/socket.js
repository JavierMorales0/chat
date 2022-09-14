import { UserModel } from "./db/models/UserModel.js";
import { HistoryModel } from "./db/models/HistoryModel.js";

/*
 *  socket.js - Socket.io configuration
 */

const BOT_NAME = "bot";

export default (io) => {
  // Setting the namespace "chat"
  io.of("/chat").on("connection", async (socket) => {
    // Verify if the user has username
    if (!socket.handshake.query.username) {
      // Disconnect the user
      socket.disconnect(true);
      return;
    }
    // Set the username
    socket.username = socket.handshake.query.username;
    // Verify if the user exists
    const user = await UserModel.findOne({ username: socket.username });
    if (!user) {
      // Lets save a new user
      const _user = UserModel({
        username: socket.username,
        email: "test@gmail.com",
        avatar: "",
      });
      await _user.save();
      socket.user = _user;
      console.log(_user._id);
    } else {
      socket.user = user;
    }
    // Add to History
    const _history = HistoryModel({
      user: socket.user._id,
      socketId: socket.id,
    });
    await _history.save();
    // Add to online users
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
    socket.on("disconnect", async () => {
      // Disconnect on history
      _history.disconnectionDate = Date.now();
      _history.status = "offline";
      await _history.save();
      // Send the message to the rest of the users
      socket.broadcast.emit("chat:actions", {
        by: BOT_NAME,
        message: `${socket.username} left the chat`,
      });
    });
  });
};
