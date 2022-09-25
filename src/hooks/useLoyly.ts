import { API_URL } from '@env';
import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useLoylyAudio } from './useLoylyAudio';

export const useLoyly = () => {
  const requested = useRef<boolean>(false);
  const { playSound } = useLoylyAudio();

  const start = useCallback(async () => {
    try {
      console.log(API_URL);
      await axiosClient.post<{ message: string }>(`${API_URL}humidifier/start`);
      await playSound();
      console.log('start');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, [playSound]);

  const stop = useCallback(async () => {
    try {
      console.log(API_URL);
      await axiosClient.post<{ message: string }>(`${API_URL}humidifier/stop`);
      console.log('stop');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, []);

  const postLoyly = useCallback(async () => {
    try {
      if (requested.current) return;
      requested.current = true;
      await start();

      // 13秒後に止める
      setTimeout(async () => {
        await stop();
        requested.current = false;
      }, 13000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, [start, stop]);

  return {
    start,
    stop,
    postLoyly,
  };
};
