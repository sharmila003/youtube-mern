
import Sidebar from '../components/Sidebar';
import { addToWatchLater, fetchWatchLater, removeFromWatchLater } from '../slices/Watchlaterslice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import VideoCard from '../components/Videocard';

function WatchLater() {
  const dispatch = useDispatch();
  const watchLaterlist = useSelector((state) => state.watchLaterlist.videos);
  const status = useSelector((state) => state.watchLaterlist.status);

  useEffect(() => {
    dispatch(fetchWatchLater());
  }, [dispatch]);

  // eslint-disable-next-line no-unused-vars
  const handleAddToWatchLater = (video) => {
    dispatch(addToWatchLater(video));
  };

  const handleRemoveFromWatchLater = (videoId) => {
    dispatch(removeFromWatchLater(videoId));
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to load videos</p>;
  }

  return (
    <div className="app">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {watchLaterlist.length > 0 ? (
            watchLaterlist.map((video) => (
              <div key={video.id}>
                <VideoCard data={video} />
                <button onClick={() => handleRemoveFromWatchLater(video.id)}>Remove</button>
              </div>
            ))
          ) : (
            <p>No videos in Watch Later</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchLater;
