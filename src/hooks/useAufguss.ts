import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';

export const useAufguss = () => {
  const requested = useRef<boolean>(false);

  const startAufguss = useCallback(async () => {
    try {
      if (requested.current) return;
      requested.current = true;
      await axiosClient.post<{ message: string }>(`blower/start`);
      console.log('start');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, []);

  const stopAufguss = useCallback(async () => {
    try {
      if (!requested.current) return;
      await axiosClient.post<{ message: string }>(`blower/stop`);
      requested.current = false;
      console.log('stop');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, []);

  return {
    requested: requested.current,
    startAufguss,
    stopAufguss,
  };
};
