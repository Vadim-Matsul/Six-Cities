import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../token/token';

const BASE_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
enum Unauth {
  status = 401,
  message = 'Не забудьте авторизоваться'
}


export const CreateApi = ():AxiosInstance => {

  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
  });


  api.interceptors.response.use(
    (response: AxiosResponse) => (response),
    (error:AxiosError) => {
      if (error.response?.status === Unauth.status){
        toast.error(Unauth.message);
      }
      return Promise.reject(error);
    });


  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const jwt = getToken();
      jwt && ( config.headers['x-token'] = jwt );
      return config;
    });

  return api;
};
