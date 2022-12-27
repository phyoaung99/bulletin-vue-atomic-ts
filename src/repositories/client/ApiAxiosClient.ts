import axios, { type AxiosRequestConfig } from 'axios';
import type { AxiosInstance } from 'axios';
import store from "@/store";

const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN;
const baseURL = `${baseDomain}`;

/**
 * バックエンドAPI 接続用 Axios インスタンス
 */
const repository: AxiosInstance = axios.create({ baseURL });

const __DEBUG__ = import.meta.env.MODE !== 'prod';

repository.interceptors.request.use((request: AxiosRequestConfig) => {
  if (store.state.user) {
    const user: any = store.state.user;
    const tokenType = user.token_type;
    const token = user.access_token;
    if (token)
      request.headers!.Authorization = `${tokenType} ${token}`;
  }
  if (__DEBUG__) {
    console.debug(`# Req: [${request.method?.toUpperCase()}] ${request.url}`, request.data);
  }
  return request;
});

repository.interceptors.response.use(
  (response) => {
    if (__DEBUG__) {
      console.debug(
        `[${response.config.method?.toUpperCase()}] ${response.config.url} => ${response.status}`, response.data
      );
    }

    return response;
  },
  (error) => {
    if (__DEBUG__) {
      const res = error.response;
      if (res) {
        console.error(
          `[${res.config.method.toUpperCase()}] ${res.config.url} => ${res.status}`,
          error.message
        );
      }
    }

    return Promise.reject(error);
  }
);

export default repository;
