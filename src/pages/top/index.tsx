import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigator } from '../../types/stackNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 220,
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 169,
  },
  modeButton: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    width: 210,
    height: 50,
    borderColor: 'black',
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export const Top = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigator>>();

  return (
    <ImageBackground
      source={require('../../assets/topPageBG.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>SAUNIL</Text>
        <Text style={styles.subtitle}>
          サウナはもう要らない　ここがサウナだから
        </Text>
        <Pressable
          style={styles.modeButton}
          onPress={() => navigation.navigate('Aufguss')}
        >
          <Text style={styles.buttonText}>アウフグースモードへ</Text>
        </Pressable>
        <Pressable
          style={styles.modeButton}
          onPress={() => navigation.navigate('Loyly')}
        >
          <Text style={styles.buttonText}>ロウリュモードへ</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};
