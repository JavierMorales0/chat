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
  const response = await HistoryModel.aggregate([
    {
      // Group by user Id
      $group: {
        _id: "$user",
        // Get how many times did the user get connected
        times: { $sum: 1 },
        lastConnection: { $last: "$connectionDate" },
      },
    },
    {
      // Sort by connectionDate fron close to far
      $sort: { lastConnection: -1 },
    },
    {
      // Limit 5 registers
      $limit: 5,
    },
    {
      // Populating user data
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      // Merge the array to one single object
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
        },
      },
    },

    // Setting which parameters i want on the response
    { $project: { _id: 0, status: 0, user: 0, __v: 0 } },
  ]);
  res.json(response);
});
export default router;
