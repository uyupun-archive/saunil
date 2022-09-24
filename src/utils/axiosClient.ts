import { API_URL, UYUNPUNION_TOKEN } from '@env';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'UYUNPUNION-TOKEN': UYUNPUNION_TOKEN,
  },
});
