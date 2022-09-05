import fs from "fs";

const _FILE = "./src/db/onlineUsers.json";

export function getUsers() {
  try {
    // Read actual online users
    const onlineUsersFile = fs.readFileSync(_FILE);
    return JSON.parse(onlineUsersFile);
  } catch (error) {
    console.log(error);
  }
}

export function addUser(username, id) {
  try {
    // Read actual online users
    const onlineUsersFile = fs.readFileSync(_FILE);
    let onlineUsers = JSON.parse(onlineUsersFile);
    onlineUsers.push({ username, id });
    fs.writeFileSync(_FILE, JSON.stringify(onlineUsers));
  } catch (error) {
    console.log(error);
  }
}

export function removeUser(id) {
  // Read actual online users
  let onlineUsers = fs.readFileSync(_FILE);
  onlineUsers = JSON.parse(onlineUsers);
  // Remove the user
  const newListOnlineUsers = onlineUsers.filter((data) => data.id != id);
  // Write file
  fs.writeFileSync(_FILE, JSON.stringify(newListOnlineUsers));
}
