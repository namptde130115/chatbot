import axios from 'axios';
// const dotenv = require('dotenv');
// dotenv.config();

// require('dotenv').config()

const axiosClient = axios.create({
  baseURL: `https://localhost:8443/api/v1/widget`,
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

export default axiosClient;
