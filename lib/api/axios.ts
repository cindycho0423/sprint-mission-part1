import axios from 'axios';
import { postRefreshToken } from './postRefreshToken';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

postRefreshToken(axiosInstance);
