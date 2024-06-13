import { AxiosInstance } from 'axios';

export async function postRefreshToken(axiosInstance: AxiosInstance) {
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

      if (
        response &&
        response.status === 401 &&
        response.data &&
        response.data.message === 'Unauthorized' &&
        !config._retry
      ) {
        config._retry = true;
        const refreshToken = sessionStorage.getItem('refreshToken');
        try {
          const refreshResponse = await axiosInstance.post('/auth/refresh-token', { refreshToken });

          if (refreshResponse.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
            sessionStorage.setItem('accessToken', accessToken);

            if (newRefreshToken) {
              sessionStorage.setItem('refreshToken', newRefreshToken);
            }

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(config);
          }
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          alert('LOGIN EXPIRED');
          window.location.replace('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
