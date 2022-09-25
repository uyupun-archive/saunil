import { useCallback, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useAufgussAudio = () => {
  const [soundState, setSoundState] = useState<Audio.Sound>();

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audios/aufguss.mp3')
    );
    sound.setStatusAsync({ isLooping: true });
    setSoundState(sound);

    await sound.playAsync();
  }, []);

  const stopSound = useCallback(() => {
    soundState.unloadAsync();
  }, [soundState]);

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  return {
    playSound,
    stopSound,
  };
};
