/// <reference types="nativewind/types" />

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Navigation from './Navigation';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}