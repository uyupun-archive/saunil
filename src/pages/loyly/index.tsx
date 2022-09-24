import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigator } from '../../types/stackNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Loyly = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigator>>();

  return (
    <View style={styles.container}>
      <Text>ロウリュページ</Text>
      <Button title="トップへ" onPress={() => navigation.goBack()} />
      <StatusBar style="auto" />
    </View>
  );
};
