import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useGyroscope } from '../../hooks/useGyroscope';
import { useLoyly } from '../../hooks/useLoyly';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigator } from '../../types/stackNavigator';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

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
    margin: 0,
  },
  arrowUndo: {
    transform: [{ rotateZ: '-45deg' }],
    marginTop: 20,
    marginRight: 70,
  },
});

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
      <View style={styles.container}>
        <Text>
          &#9888;ジャイロセンサーが機能するスマートフォンをご使用ください。
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>傾けろ！</Text>
      <Ionicons
        name="arrow-undo"
        size={36}
        color="black"
        style={styles.arrowUndo}
      />
      <FontAwesome
        name="mobile-phone"
        size={128}
        color="black"
        style={styles.mobilePhone}
      />
    </View>
  );
};
