import { Router } from "express";
import { getUsers } from "./db/localDatabase.js";

const router = Router();

router.get("/online-users", (req, res) => {
  const onlineUsers = getUsers();
  return res.json(onlineUsers);
});

export default router;
