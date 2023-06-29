

const API_URL = {
    SEARCH: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&safe_search=${process.env.REACT_APP_SAFE_SEARCH}&media=photos&per_page=${process.env.REACT_APP_PER_PAGE}&format=json&nojsoncallback=1&`,
    DEFAULT: `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API_KEY}&safe_search=${process.env.REACT_APP_SAFE_SEARCH}&per_page=${process.env.REACT_APP_PER_PAGE}&format=json&nojsoncallback=1&`,
    SHOW: 'https://live.staticflickr.com/'
  };
  
  export default API_URL;
  