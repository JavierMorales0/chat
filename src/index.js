/*
 *   index.js - Main file where the application is started
 */

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import api from "./api.js";

// Importing the socket.io configuration
import SocketIO from "./socket.js";

// Creating the express application
const app = express();
// Creating the http server using the express application
const server = createServer(app);
// Creating the socket.io server using the http server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// Calling the socket.io configuration
SocketIO(io);

// Setting the port to listen on
app.set("port", process.env.PORT || 3000);

// Setting the configuration for the application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting the static files path
app.use("/chat/api", api);

// Initializing the server
server.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
