// Api  information
//export const API_KEY = "AIzaSyCP876fUEYpZa1zZ7QB4VVT1ULLaOTvzHo ";
export const API_KEY = " AIzaSyBraiICQKAHDknPHQ1cL6u2hj5xBCl20v0";
export const BASE_URL = "https://www.googleapis.com/youtube/v3"
export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`;
export const SEARCH_API=" https://www.googleapis.com/youtube/v3/search?part=snippet&q=${input}&type=video&key=${API_KEY}"
export default API_KEY; // default export



