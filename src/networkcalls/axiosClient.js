import axios from 'axios';

const axiosClient = axios.create();

// Intercept request to add content type and headers
axiosClient.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json';

    return request;
  },
  null,
  { synchronous: true }
);

axiosClient.interceptors.response.use(
    (response) =>
      // Dispatch any action on success
      response?.data,
    (error) => {
      return Promise.reject(error.response.data);
    }
  );

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// All request will wait 1 min before timeout
axiosClient.defaults.timeout = 60000;

export default axiosClient;
