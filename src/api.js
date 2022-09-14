import { Router } from "express";
import { UserModel } from "./db/models/UserModel.js";
import { HistoryModel } from "./db/models/HistoryModel.js";

const router = Router();

router.get("/online-users", async (req, res) => {
  /*const _history = HistoryModel({
    user: "6321305b97efe4e865660c64",
  });
  await _history.save();*/
  const response = await HistoryModel.find({ status: "online" }).populate({
    path: "user",
    select: "username email",
  });
  res.json(response);
});

router.get("/last-users", async (req, res) => {
  const response = await HistoryModel.find({ status: "offline" })
    .populate({
      path: "user",
      select: "username email avatar",
    })
    .sort([["disconnectionDate", -1]])
    .limit(10);
  res.json(response);
});
export default router;
