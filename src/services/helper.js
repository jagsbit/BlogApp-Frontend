import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL='http://blogapp-env.eba-shez52nd.ap-south-1.elasticbeanstalk.com';

export const myAxios=axios.create({
    baseURL:BASE_URL
});

export const privateAxios=axios.create({
    baseURL:BASE_URL
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {}; // ensure headers object exists
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    //console.log(config)
    return config;
  },
  (error) => Promise.reject(error)
);
