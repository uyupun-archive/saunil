import { API_URL } from '@env';
import axios from 'axios';
import { useCallback, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useAufgussAudio } from './useAufgussAudio';

export const useAufguss = () => {
  const requested = useRef<boolean>(false);
  const { playSound, stopSound } = useAufgussAudio();

  const start = useCallback(async () => {
    try {
      console.log(API_URL);
      await axiosClient.post<{ message: string }>(`${API_URL}blower/start`);
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
      await axiosClient.post<{ message: string }>(`${API_URL}blower/stop`);
      stopSound();
      console.log('stop');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error('エラーが発生しました。');
    }
  }, [stopSound]);

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
