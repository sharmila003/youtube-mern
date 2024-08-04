import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_KEY from "../data/youtube";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdQueue,
  MdWatchLater,
  MdPlaylistAdd,
  MdNotInterested,
  MdReport,
  MdDoNotDisturb,
} from "react-icons/md"; // Add appropriate icons
import { useSelector, useDispatch } from "react-redux";
import { addToWatchLater, fetchWatchLater } from "../slices/Watchlaterslice";

function Watch() {
  const [singleVideo, setSingleVideo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { videoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get authentication status from Redux store

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      console.log(res?.data?.items[0]);
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle "Save to Watch Later" click
  const handleSaveToWatchLater = () => {
    if (!isLoggedIn) {
      navigate("/signin"); // Redirect to sign-in page if not logged in
    } else {
      // Add video to Watch Later list
      dispatch(addToWatchLater(singleVideo))
        .then((res) => {
          console.log("dontrwqwkjdnwjbyuaebw", res);
          dispatch(fetchWatchLater());
        }) // Refresh the Watch Later list
        .catch((error) => {
          console.log("dontrwqwkjdnwjbyuaebw error");
          console.error("Error updating Watch Later list:", error);
        });
      console.log("Video added to Watch Later list");
      setShowDropdown(false);
      navigate("/watch-later");
    }
  };

  return (
    <div className="flex ml-4">
      <div>
        <iframe
          width="900"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h1 className="font-bold mt-2 text-lg">
          {singleVideo?.snippet?.title}
        </h1>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center justify-between w-[20%]">
            <div className="flex">
              <Avatar
                src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                size={35}
                round={true}
              />
              <h1 className="font-bold ml-2">
                {singleVideo?.snippet?.channelTitle}
              </h1>
            </div>
            <button className="px-4 py-1 font-medium bg-black text-white rounded-full ml-2">
              Subscribe
            </button>
          </div>
          <div className="flex items-center ml-2 space-x-2 relative">
            <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
              <AiOutlineLike size="20px" className="mr-2" />
              <AiOutlineDislike size="20px" />
            </div>
            <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
              <PiShareFatLight size="20px" className="mr-2" />
              <span>Share</span>
            </div>
            <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
              <GoDownload />
              <span>Download</span>
            </div>
            <div
              className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full"
              onClick={toggleDropdown}
            >
              <BsThreeDotsVertical />
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                <div className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <MdQueue className="mr-2" />
                  <span>Add to Queue</span>
                </div>
                <div
                  className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={handleSaveToWatchLater}
                >
                  <MdWatchLater className="mr-2" />
                  <span>Save to Watch Later</span>
                </div>
                <div className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <MdPlaylistAdd className="mr-2" />
                  <span>Save to Playlist</span>
                </div>
                <div className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <GoDownload className="mr-2" />
                  <span>Download</span>
                </div>
                <div className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <MdNotInterested className="mr-2" />
                  <span>Not Interested</span>
                </div>
                <div className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <MdDoNotDisturb className="mr-2" />
                  <span>Dont Recommend Channel</span>
                </div>
                <div className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <MdReport className="mr-2" />
                  <span>Report</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
