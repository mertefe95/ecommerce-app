import axios, { AxiosError } from 'axios';
axios.defaults.withCredentials = true;
import { API_URL } from '../constants';

export const axiosInstance = axios.create({
  baseURL: API_URL ?? 'api',
});

const api = {
  axios: axiosInstance,
  AxiosError,
};

export default api;
