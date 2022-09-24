import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';
import { useLoyly } from '../../hooks/useLoyly';

export const Loyly = () => {
  const { z } = useGyroscope();
  const { postLoyly } = useLoyly();

  const runLoyly = useCallback(async () => {
    await postLoyly();
  }, [postLoyly]);

  if (Math.abs(z) > 3) {
    runLoyly();
  }

  if (!Gyroscope.isAvailableAsync())
    return (
      <View>
        <Text>
          &#9888;ジャイロセンサーが機能するスマートフォンをご使用ください。
        </Text>
      </View>
    );

  return (
    <View>
      <Text>Gyroscope:</Text>
      <Text>z: {z}</Text>
    </View>
  );
};
