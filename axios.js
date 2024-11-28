import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2727',
  withCredentials: true,
});

export default axiosInstance;