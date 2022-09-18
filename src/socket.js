import { UserModel } from "./db/models/UserModel.js";
import { HistoryModel } from "./db/models/HistoryModel.js";

// IMPORT MOMENTJS
import moment from "moment";
/*
 *  socket.js - Socket.io configuration
 */

const BOT_NAME = "bot";

export default (io) => {
  // Setting the namespace "chat"
  io.of("/chat").on("connection", (socket) => {
    /*
     *  Configurating the events
     */

    socket.on("chat:login", async (data) => {
      // Set the username
      const { username, email, avatar } = data;
      const { remoteAddress, remotePort } = socket.request.connection;
      // Verify if the user exists
      let user = await UserModel.findOne({ email });
      if (!user) {
        // Lets save a new user
        user = UserModel({
          username,
          email,
          avatar: avatar ?? "",
        });
        await user.save();
      }
      socket.user = user;

      // IF USERNAME OR AVATAR HAS CHANGED APPLY THIS CHANGES ON DB
      if (username != user.username || avatar != user.avatar) {
        user.username = username;
        user.avatar = avatar;
        await user.save();
        console.log("User data has changed!");
      }
      // Add to History
      const _history = HistoryModel({
        user: socket.user._id,
        socketId: socket.id,
        ipAddress: remoteAddress + ":" + remotePort,
      });
      await _history.save();
      // Add to online users
      console.log(`${socket.user.username} connected`);
      // Send the message to the rest of the users
      socket.broadcast.emit("chat:actions", {
        by: BOT_NAME,
        message: `${socket.user.username} joined the chat`,
      });
    });

    // When the user send a message
    socket.on("chat:message", ({ message, date }) => {
      // Setting the broadcast message to the room
      socket.broadcast.emit("chat:message", {
        username: socket.user.username,
        avatar: socket.user.avatar,
        message,
        date,
      });
    });

    // When user is typing
    socket.on("chat:typing", () => {
      // Send the message to all the users
      socket.broadcast.emit("chat:typing", {
        message: `${socket.user.username} is typing...`,
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
      // IF IT HAS NOT A LOGIN YET
      if (!socket.user) {
        console.log("Some unlogged user has disconnected");
        return;
      }
      // GET THE SPECIFIC RECORD
      const history = await HistoryModel.findOne({
        socketId: socket.id,
        status: "online",
      });
      // SET THE DISCONNECTION DATE
      history.disconnectionDate = Date.now();
      // SET THE STATUS OFFLINE
      history.status = "offline";
      // SAVE RECORD
      await history.save();
      // Send the message to the rest of the users
      socket.broadcast.emit("chat:actions", {
        by: BOT_NAME,
        message: `${socket.user.username} left the chat`,
      });
      console.log(`${socket.user.username} disconnected`);
    });
  });
};
