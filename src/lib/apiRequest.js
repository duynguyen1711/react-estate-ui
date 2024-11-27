import axios from 'axios';
const apiRequest = axios.create({
  baseURL: 'http://localhost:5246/api',
  withCredentials: true,
});
export default apiRequest;
