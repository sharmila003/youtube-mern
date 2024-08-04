/*import { setHomeVideo } from '../slices/appslice';
import { setCategory } from '../slices/appslice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import youtubeicon from '../assets/youtubeicon.jpg';
import voiceicon from '../assets/searchbyvoiceicon.png';
import creatoricon from '../assets/creatoricon.png';
import notificationicon from '../assets/notificationicon.png';
import pictureicon from '../assets/pictureicon.png';
import { useDispatch } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import { auth } from '../firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { API_KEY } from '../data/youtube';
import  wishlisticon from '../assets/wishlisticon.png';

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const searchVideo = async () => {
    if (input.trim() === "") return;

    // eslint-disable-next-line no-undef
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${input}&type=video&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.items);
       console.log(data.items)
       dispatch(setHomeVideo(data.items))
       dispatch(setCategory(input));
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }

    setInput("");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };
  
  const handleWishlistClick = () => {
    if (user) {
      navigate('/watch-later');
    } else {
      navigate('/signin');
    }
  };



  return (
    <div className="flex justify-between items-center p-1 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          className="w-6 h-6 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/128/11480/11480420.png"
          alt="menuicon"
          onClick={toggleSidebar}
        />
        <img
          className="h-6 w-15"
          src={youtubeicon}
          alt="youtubeicon"
        />
      </div>
      <div className="flex items-center flex-grow justify-center">
        <div className="flex w-[60%] items-center">
          <div className="flex w-[100%]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none"
            />
            <button
              onClick={searchVideo}
              className="py-2 border border-gray-400 rounded-r-full px-4"
            >
              <CiSearch size="24px" />
            </button>
          </div>
          <img
            className="w-5 h-5 ml-3 cursor-pointer"
            src={voiceicon}
            alt="voiceicon"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 relative">
        <img
          className="w-6 h-6 cursor-pointer"
          src={wishlisticon}
          alt="wishlisticon"
          onClick={handleWishlistClick}
        />
        <img
          className="w-6 h-6 cursor-pointer"
          src={creatoricon}
          alt="creatoricon"
        />
        <img
          className="w-5 h-5 cursor-pointer"
          src={notificationicon}
          alt="notificationicon"
        />
        <div className="relative">
          <img
            className="w-6 h-6 cursor-pointer"
            src={pictureicon}
            alt="pictureicon"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              {user ? (
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;*/

import { setHomeVideo } from "../slices/appslice";
import { setCategory } from "../slices/appslice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import youtubeicon from "../assets/youtubeicon.jpg";
import voiceicon from "../assets/searchbyvoiceicon.png";
import creatoricon from "../assets/creatoricon.png";
import notificationicon from "../assets/notificationicon.png";
import pictureicon from "../assets/pictureicon.png";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { API_KEY } from "../data/youtube";
import wishlisticon from "../assets/wishlisticon.png";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("bab", isLoggedIn);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state based on auth status
    });

    return () => unsubscribe();
  }, []);

  const searchVideo = async () => {
    if (input.trim() === "") return;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${input}&type=video&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.items);
      dispatch(setHomeVideo(data.items));
      dispatch(setCategory(input));
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }

    setInput("");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleWishlistClick = () => {
    if (user) {
      // Check if user is authenticated
      navigate("/watch-later");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="flex justify-between items-center p-1 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          className="w-6 h-6 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/128/11480/11480420.png"
          alt="menuicon"
          onClick={toggleSidebar}
        />
        <img className="h-6 w-15" src={youtubeicon} alt="youtubeicon" />
      </div>
      <div className="flex items-center flex-grow justify-center">
        <div className="flex w-[60%] items-center">
          <div className="flex w-[100%]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none"
            />
            <button
              onClick={searchVideo}
              className="py-2 border border-gray-400 rounded-r-full px-4"
            >
              <CiSearch size="24px" />
            </button>
          </div>
          <img
            className="w-5 h-5 ml-3 cursor-pointer"
            src={voiceicon}
            alt="voiceicon"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 relative">
        <img
          className="w-6 h-6 cursor-pointer"
          src={wishlisticon}
          alt="wishlisticon"
          onClick={handleWishlistClick}
        />
        <img
          className="w-6 h-6 cursor-pointer"
          src={creatoricon}
          alt="creatoricon"
        />
        <img
          className="w-5 h-5 cursor-pointer"
          src={notificationicon}
          alt="notificationicon"
        />
        <div className="relative">
          <img
            className="w-6 h-6 cursor-pointer"
            src={pictureicon}
            alt="pictureicon"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              {user ? (
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
