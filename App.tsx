import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { axiosClient } from './src/utils/axiosClient';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const res = await axiosClient.get<{ message: string }>('ping');
        setMessage(res.data.message);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log(e.message);
        }
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{isLoading ? 'ローディング中' : message ? message : 'エラー'}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
