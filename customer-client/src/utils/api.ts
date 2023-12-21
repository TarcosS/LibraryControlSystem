import axios from 'axios';
import service from '../pages/auth/service';
import { setUser } from '../store/authSlice';

export const BASE_URL = process.env.REACT_APP_API_URL;
console.log(BASE_URL)
const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
      if (error.response && error.response.status === 401) {
        const refreshToken = window?.localStorage?.getItem('refresh_token');
        if(refreshToken){
          service.setAuthorizationToken(refreshToken);
          service.refreshToken().then((res) => {
            if(res?.data){
              service.setToken(res?.data.access_token);
              service.setAuthorizationToken(res?.data.access_token);
              setUser(res?.data.user_details)
            }
          })
        }
      }
      // Handle other errors here
      return Promise.reject(error);
  }
)

export default API;
