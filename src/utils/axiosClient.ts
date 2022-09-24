import { API_URL, UYUNPUNION_TOKEN } from '@env';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

axiosClient.interceptors.request.use((config) => {
  config.headers = {
    'Content-Type': 'application/json',
    'UYUNPUNION-TOKEN': UYUNPUNION_TOKEN,
  };

  return config;
});

export { axiosClient };
