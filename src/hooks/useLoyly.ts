import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';

export const useLoyly = () => {
  const requested = useRef<boolean>(false);

  const postLoyly = useCallback(async () => {
    try {
      if (requested.current) return;
      requested.current = true;
      const res = await axiosClient.post<{ message: string }>(
        `humidifier/start`
      );
      console.log(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    } finally {
      // 5秒後にリクエストできるようになる
      setTimeout(() => (requested.current = false), 5000);
    }
  }, []);

  return {
    postLoyly,
  };
};
