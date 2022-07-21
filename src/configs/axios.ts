import axios, { AxiosInstance, AxiosError } from 'axios';

interface IError {
  code: number;
  error: string;
  message: string;
}

export type AxiosErrorType = AxiosError<IError>;

const baseURL = __DEV__ ? 'http://localhost:3000' : process.env.SERVER_URL;

export const fetch: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});
