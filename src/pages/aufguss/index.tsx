import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';
import { useAufguss } from '../../hooks/useAufguss';

export const Aufguss = () => {
  const { x, y } = useGyroscope();
  const { requested, startAufguss, stopAufguss } = useAufguss();
  const counter = useRef<number>(0);

  if (Math.abs(x) >= 4 || Math.abs(y) >= 4) {
    counter.current = 0;
    if (!requested) {
      startAufguss();
    }
  }

  // 2.1秒間スマホを振っていない場合は止める
  if ((Math.abs(x) < 4 || Math.abs(y) < 4) && requested) {
    counter.current += 1;
    if (counter.current >= 7) {
      stopAufguss();
      counter.current = 0;
    }
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
