import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';
import { useAufguss } from '../../hooks/useAufguss';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigator } from '../../types/stackNavigator';
import { FontAwesome, Foundation } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 36,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobilePhone: {
    transform: [{ rotateZ: '-90deg' }],
    margin: 20,
  },
  arrowsExpand: {
    transform: [{ rotateZ: '-45deg' }],
    margin: 20,
  },
});

export const Aufguss = () => {
  const { x, y } = useGyroscope();
  const { requested, startAufguss, stopAufguss, stop } = useAufguss();
  const counter = useRef<number>(0);
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigator>>();

  // アンマウント時に止める
  useEffect(() => {
    const init = navigation.addListener('focus', () => {
      stop();
    });

    return init;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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
      <View style={styles.container}>
        <Text>
          &#9888;ジャイロセンサーが機能するスマートフォンをご使用ください。
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>上下に振れ！</Text>
      <View style={styles.row}>
        <FontAwesome
          name="mobile-phone"
          size={128}
          color="black"
          style={styles.mobilePhone}
        />
        <Foundation
          name="arrows-expand"
          size={64}
          color="black"
          style={styles.arrowsExpand}
        />
      </View>
    </View>
  );
};
