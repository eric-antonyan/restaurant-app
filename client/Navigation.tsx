import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { DisheType } from './types/DisheType';
import CartScreen from './screens/CartScreen';
import DevliveryScreen from './screens/DeliveryScreen';
import { Easing } from 'react-native';
import FeatureScreen from './screens/FeatureScreen';

type RootStackParamList = {
  Home: undefined;
  Restaurant: {
    id: number;
    name: string;
    image: string;
    lng: number;
    lat: number;
    address: string;
    stars: number;
    reviews: number;
    category: string;
    dishes: DisheType[];
  };
  Cart: any,
  Delivery: any,
  Feature: any
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshotClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }
  }

  const closeConfig = {
    animation: "timing",
    config: {
      duration: 200,
      easing: Easing.linear
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name='Delivery' options={{
          presentation: "fullScreenModal"
        }} component={DevliveryScreen} />
        <Stack.Screen name="Cart" options={{
          presentation: "modal"
        }} component={CartScreen} />
        <Stack.Screen name='Feature' component={FeatureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}