import axios from 'axios';
// const dotenv = require('dotenv');
// dotenv.config();

// require('dotenv').config()

const axiosClient = axios.create({
  baseURL: `http://localhost:8089/api/v1`,
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {
    Authorization: '',
  };

  const token = localStorage.getItem('token');
  if (token) {
    customHeaders.Authorization = `Beaer ${token}`;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('ahihi', error.response);
    if (error.response.status === 401) {
      console.log('401 roi');
      // localStorage.clear();
    } else {
      throw error;
    }
  }
);

export default axiosClient;
