/*
 *   index.js - Main file where the application is started
 */

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Importing the socket.io configuration
import SocketIO from "./socket.js";

// Setting the URL and dirname of the application
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Initializing the server
server.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
