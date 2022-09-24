import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';
import { useLoyly } from '../../hooks/useLoyly';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigator } from '../../types/stackNavigator';

export const Loyly = () => {
  const { z } = useGyroscope();
  const { postLoyly, stop } = useLoyly();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigator>>();

  // アンマウント時に止める
  useEffect(() => {
    const init = navigation.addListener('focus', () => {
      stop();
    });

    return init;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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
