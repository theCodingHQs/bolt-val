// utils/apiClient.ts
import axios from 'axios';
import storage from './auth';

const apiClient = axios.create({
  baseURL: 'https://valsoft.in/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach token
apiClient.interceptors.request.use(async (config) => {
  const token = await storage.getItem?.('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export async function upload(url, data) {
  try {
    const token = await storage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? token : '',
      },
    };

    let response;
    if (data.get('id')) {
      response = await apiClient.put(url, data, config);
    } else {
      response = await apiClient.post(url, data, config);
    }

    // Check for successful status code (200-299)
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      return response;
    }
  } catch (err) {
    // Return error response or fallback if error.response is undefined
    return Promise.resolve(
      err.response || {
        status: 500,
        data: { message: 'Network or server error' },
      }
    );
  }
}

export default apiClient;
