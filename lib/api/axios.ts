import axios from 'axios';
import { postRefreshToken } from './postRefreshToken';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;

    console.error('API call error:', error);

    if (response && response.status === 401 && response.data && response.data.message === 'Unauthorized') {
      const originalRequest = config;
      try {
        const refreshResponse = await postRefreshToken();
        if (refreshResponse.status === 200) {
          const { accessToken, refreshToken } = refreshResponse.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          alert('LOGIN EXPIRED');
          window.location.replace('/login');
        }
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);

        alert('LOGIN EXPIRED');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);
