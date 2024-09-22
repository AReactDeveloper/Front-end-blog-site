import axios from 'axios';



// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your Laravel backend URL
  withCredentials: true, // This allows cookies to be sent with requests
  withXSRFToken : true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'accept':'application/json',
  },
});


// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sanctum_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Don't forget to return the config!
  },
  (error) => {
    return Promise.reject(error); // Handle errors as well
  }
);




export default axiosInstance 