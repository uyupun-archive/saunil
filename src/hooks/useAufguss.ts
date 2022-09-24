import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';

export const useAufguss = () => {
  const requested = useRef<boolean>(false);

  const start = useCallback(async () => {
    try {
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

  const stop = useCallback(async () => {
    try {
      await axiosClient.post<{ message: string }>(`blower/stop`);
      console.log('stop');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, []);

  const startAufguss = useCallback(async () => {
    try {
      if (requested.current) return;
      requested.current = true;
      await start();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, [start]);

  const stopAufguss = useCallback(async () => {
    try {
      if (!requested.current) return;
      await stop();
      requested.current = false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, [stop]);

  return {
    requested: requested.current,
    start,
    stop,
    startAufguss,
    stopAufguss,
  };
};
