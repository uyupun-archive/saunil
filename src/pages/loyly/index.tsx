import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';

export const Loyly = () => {
  const [isStart, setStart] = useState<boolean>(false);
  const { z } = useGyroscope();

  if (!isStart && Math.abs(z) > 2) {
    setStart(() => true);
  }

  if (isStart && Math.round(z) === 0) {
    console.log('ロウリュAPIへリクエスト');
    setStart(() => false);
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
      <Text>x: {Math.round(z)}</Text>
    </View>
  );
};
