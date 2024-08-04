
import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Videocard from './Videocard';
import API_KEY from '../data/youtube';
import { setHomeVideo} from '../slices/appslice';
import {selectVideoList }  from  '../slices/selectors';


export const Feed = () => {
  const dispatch = useDispatch();
   const videolist = useSelector(selectVideoList);
   console.log(videolist);
   //const category = useSelector(selectCategoryList);
    //console.log(category);
   useEffect(() => {
    fetchvideos();
  }, []);

  async function fetchvideos() {
    const res = await fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=' + API_KEY
    );
    const data = await res.json();
    console.log(data.items);
    dispatch(setHomeVideo(data.items));
  }

  return (
    <div className='ml-5 mr-5 w-[100%] flex flex-wrap col-3'>
      {videolist.map((item) => {
        return <Videocard key={item.id.videoId || item.id} data={item} />;
      })}
    </div>
  );
};
