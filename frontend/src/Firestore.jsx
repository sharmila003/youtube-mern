import { db } from "./firebase";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

export const saveUserData = async (userId, data) => {
  try {
    await setDoc(doc(db, "users", userId), data);
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const saveVideoToWatchLater = async (userId, video) => {
  try {
    const videoRef = doc(collection(db, "users", userId, "watchLater"));
    await setDoc(videoRef, video);
    return { id: videoRef.id, ...video };
  } catch (error) {
    console.error("Error saving video:", error);
    throw error;
  }
};

export const deleteVideoFromWatchLater = async (userId, videoId) => {
  try {
    const videoRef = doc(db, "users", userId, "watchLater", videoId);
    await deleteDoc(videoRef);
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};

export const getWatchLaterVideos = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "watchLater"));
    let videos = [];
    querySnapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });
    return videos;
  } catch (error) {
    console.error("Error fetching watch later videos:", error);
    throw error;
  }
};
