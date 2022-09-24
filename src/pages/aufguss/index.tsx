import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Aufguss = () => {
  return (
    <View style={styles.container}>
      <Text>アウフグースページ</Text>
      <StatusBar style="auto" />
    </View>
  );
};