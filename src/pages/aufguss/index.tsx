import React from 'react';
import { Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';

export const Aufguss = () => {
  const { x, y } = useGyroscope();

  if (x < -10 || y < -10) {
    console.log('アウフグースAPIへリクエスト');
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
      <Text>x: {Math.round(x)}</Text>
      <Text>y: {Math.round(y)}</Text>
    </View>
  );
};
