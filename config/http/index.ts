import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});

api.interceptors.request.use(
  (req: InternalAxiosRequestConfig<any>) => {
    req.params = {
      ...req.params,
      ts: process.env.EXPO_PUBLIC_MARVEL_TIMESTAMP,
      apikey: process.env.EXPO_PUBLIC_MARVEL_PUBLIC_API_KEY,
      hash: process.env.EXPO_PUBLIC_MARVEL_HASH,
    };
   
    return req;
  },
  (err) => {
  
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {    
    return Promise.reject(err);
  }
);


export default api;