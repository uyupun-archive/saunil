import { useCallback, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useLoylyAudio = () => {
  const [soundState, setSoundState] = useState<Audio.Sound>();

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audios/loyly.mov')
    );
    setSoundState(sound);

    await sound.playAsync();
  }, []);

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  return {
    playSound,
  };
};
