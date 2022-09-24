import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';

export const useLoyly = () => {
  const requested = useRef<boolean>(false);

  const start = useCallback(async () => {
    try {
      await axiosClient.post<{ message: string }>(`humidifier/start`);
      console.log('start');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      await axiosClient.post<{ message: string }>(`humidifier/stop`);
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

      // 10秒後に止める
      setTimeout(async () => {
        await stop();
        requested.current = false;
      }, 10000);
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
