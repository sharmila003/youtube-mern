import express from "express";
import {
  addToWatchLater,
  getWatchLaterList,
  removeFromWatchLater,
} from "../controllers/watch-later.js";
import { verifyToken } from "../verifytoken.js";

const router = express.Router();

// Add a video to the watch later list
router.post("/", verifyToken, addToWatchLater);

// Get watch later list for the user
router.get("/", verifyToken, getWatchLaterList);

//  delete video
router.delete("/:videoId", verifyToken, removeFromWatchLater);

export default router;
