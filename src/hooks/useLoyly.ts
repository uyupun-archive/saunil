import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';

export const useLoyly = () => {
  const requested = useRef<boolean>(false);

  const postLoyly = useCallback(async () => {
    try {
      if (requested.current) return;
      requested.current = true;
      await axiosClient.post<{ message: string }>(`humidifier/start`);
      console.log('start');

      // 10秒後に止める
      setTimeout(async () => {
        await axiosClient.post<{ message: string }>(`humidifier/stop`);
        requested.current = false;
        console.log('stop');
      }, 10000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, []);

  return {
    postLoyly,
  };
};
