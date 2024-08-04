// controllers/watch-later.js
import Video from "../models/video.js";
import WatchLater from "../models/watch-later.js";
import mongoose from "mongoose";

//to add videos
export const addToWatchLater = async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user.id;

  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).json({ message: "User not authenticated" });
  }
  console.log("Authenticated User:", req.user);

  try {
    console.log(`User: ${req.user.id}, Video ID: ${videoId}`);
    const video = await WatchLater.create({ userId: req.user.id, videoId });
    res.status(201).json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding video to watch later", error });
  }
};

// to get and see all added videos
export const getWatchLaterList = async (req, res) => {
  const userId = req.user.id;
  try {
    console.log("Fetching Watch Later List for User:", userId);
    const watchLaterList = await WatchLater.find({
      userId: req.user.id,
    }).populate("videoId");
    console.log("WatchLaterList:", watchLaterList);
    res.status(200).json(watchLaterList);
  } catch (error) {
    console.error("Error fetching watch later list:", error);
    res.status(500).json({ message: "Error fetching watch later list", error });
  }
};

//to delete video
export const removeFromWatchLater = async (req, res) => {
  const { videoId } = req.params;

  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).json({ message: "User not authenticated" });
  }
  console.log("Authenticated User:", req.user);

  try {
    const deletedVideo = await WatchLater.findOneAndDelete({
      userId: req.user.id,
      videoId,
    });
    if (!deletedVideo) {
      return res
        .status(404)
        .json({ message: "Video not found in watch later list" });
    }
    res.status(200).json({
      message: "Video removed from watch later list",
      video: deletedVideo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing video from watch later list", error });
  }
};
