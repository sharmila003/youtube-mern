
import { useState } from 'react';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch } from 'react-redux';
import { setCategory } from '../slices/appslice';


const tags = [
  'All',
  'webDevelopment',
  'new to you',
  'javascript',
  'Music',
  'Live',
  'Gaming',
  'News',
  'Learning',
  'Sports',
  'Travel',
  'Tech',
  'Comedy',
  'Movies',
  'Cricket',
  'Thriller',
];

const TagList = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [startIndex, setStartIndex] = useState(0);
  const visibleTagsCount = 12; // Number of tags to display at a time
  const dispatch = useDispatch();
  
  const handleTagClick = (tag) => {
    if (selectedTag !== tag) {
      dispatch(setCategory(tag));
      setSelectedTag(tag);
    }
  }
  console.log(selectedTag);
  
  

  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, tags.length - visibleTagsCount)
    );
  };

  return (
    <div className="flex items-center space-x-3 p-4 bg-white shadow-md">
      <IconButton
        onClick={handleLeftClick}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
        disabled={startIndex === 0}
      >
        <ChevronLeftIcon />
      </IconButton>
      <div className="flex overflow-hidden space-x-3">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`flex-shrink-0 px-3 py-1 ${
              selectedTag === tag
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
          {tag}
          </button>
        ))}
      </div>
      <IconButton
        onClick={handleRightClick}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
        disabled={startIndex + visibleTagsCount >= tags.length}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default TagList;


