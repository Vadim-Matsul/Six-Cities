import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../token/token';
import { HTTPConfig } from '../../const';

const BASE_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const HTTP = {
  [HTTPConfig.UnAuth]: {
    status: 401,
    message: 'Не забудьте авторизоваться'
  },
  [HTTPConfig.BadRequest]: {
    status: 400,
    message: 'Ошибка в заполнении данных'
  },
};


export const CreateApi = ():AxiosInstance => {

  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
  });


  api.interceptors.response.use(
    (response: AxiosResponse) => (response),
    (error:AxiosError) => {
      const TextStatus = error.response!.statusText;
      if (error.response?.status === HTTP[TextStatus].status){
        toast.error(HTTP[TextStatus].message);
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
