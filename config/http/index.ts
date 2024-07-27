import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});

api.interceptors.request.use(
  (req: InternalAxiosRequestConfig<any>) => {
    req.params = {
      ...req.params,
      ts: process.env.MARVEL_TIMESTAMP,
      apykey: process.env.MARVEL_PUBLIC_API_KEY,
      hash: process.env.MARVEL_HASH,
    };

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;