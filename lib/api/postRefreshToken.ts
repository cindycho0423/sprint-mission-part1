import { axiosInstance } from '@/lib/api/axios';

export async function postRefreshToken() {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
    return response;
  } catch (error) {
    console.error('Error in postRefreshToken:', error);
    throw new Error('Error in postRefreshToken');
  }
}
