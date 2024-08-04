/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import API_KEY from '../data/youtube';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchLater, removeFromWatchLater } from '../slices/Authslice'; // Import the remove action
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QueueIcon from '@mui/icons-material/Queue';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DownloadIcon from '@mui/icons-material/Download';
import BlockIcon from '@mui/icons-material/Block';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete'; 

function VideoCard({ data }) {
  const [channelLogo, setChannelLogo] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!data || !data.snippet) {
      return;
    }

    const fetchChannelLogo = async () => {
      try {
        const res = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${data.snippet.channelId}&key=${API_KEY}`
        );
        setChannelLogo(res.data.items[0].snippet.thumbnails.default.url);
      } catch (error) {
        console.error('Error fetching channel logo:', error);
      }
    };

    fetchChannelLogo();
  }, [data]);
  

  if (!data || !data.snippet) {
    return null; // Or a fallback UI
  }

  const { snippet, id } = data;
  const { title, channelTitle, thumbnails } = snippet;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleWatchLaterClick = () => {
    handleMenuClose();
    if (!isLoggedIn) {
      navigate('/signin'); // Redirect to homepage if not logged in
    } else {
      console.log('Adding video to watch later:', id);
      dispatch(addToWatchLater(id)); // Add video to watch later list
    }
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    console.log('Deleting video from watch later:', id);
    dispatch(removeFromWatchLater(id)); // Remove video from watch later list
  };

  return (
    <div className="relative w-1/3 p-1">
      <Link to={`/watch/${id}`}>
        <img className="rounded-xl w-full" src={thumbnails.medium.url} alt="thumbnails" />
      </Link>
      <div className="flex mt-2 items-start">
        <Avatar size={35} round={true} src={channelLogo} alt="channel logo" className="mr-3" />
        <div className="flex-1">
          <Link to={`/watch/${id}`}>
            <h5 className="font-medium text-sm">{title}</h5>
            <p className="text-xs mt-2 text-gray-500">{channelTitle}</p>
          </Link>
        </div>
        <div className="flex items-center">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            className="p-2"
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <QueueIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add to queue" />
        </MenuItem>
        <MenuItem onClick={handleWatchLaterClick}>
          <ListItemIcon>
            <WatchLaterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save to Watch later" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PlaylistAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save to playlist" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Download" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ThumbDownIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Not interested" />
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Don't recommend channel" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </MenuItem> 
      </Menu>
    </div>
  );
}

export default VideoCard;

