import { View, ScrollView, TouchableOpacity, Text, Animated, ImageSourcePropType } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigate';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome6 } from '@expo/vector-icons';
import { colorThemes } from '../theme';
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { FetchStars, restaurantSliceAddress } from '../Helpers';
import DisheRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import { DisheType } from '../types/DisheType';
import { urlFor } from '../sanity';

import { selectCartItems } from "../slices/cartSlice"

// Define types for parameters and items
interface Params {
  items: Item[];
}

interface Item {
  id: string;
  name: string;
  address: string;
  image: ImageSourcePropType;
  stars: number;
  category: string;
  dishes: Dish[];
}

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
}

type RestaurantScreenRouteProp = RouteProp<RootStackParamList, 'Restaurant'>;

export default function RestaurantScreen() {
  const { params } = useRoute<any>();
  const navigation = useNavigation();
  const data = params.items[1];
  const dispatch = useDispatch();
  const panY = useRef(new Animated.Value(0)).current;

  const cartItems = useSelector(selectCartItems)

  useEffect(() => {
    dispatch(setRestaurant({ ...data }));
  }, [data, dispatch]);

  return (
    <View className='flex-1'>
      <StatusBar style='auto' />
      <CartIcon />
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: panY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View className='relative'>
          <Animated.Image
            style={{
              transform: [
                {
                  translateY: panY.interpolate({
                    inputRange: [-1000, 0],
                    outputRange: [-100, 0],
                    extrapolate: 'clamp',
                  }),
                },
                {
                  scale: panY.interpolate({
                    inputRange: [-3000, 0],
                    outputRange: [20, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
            className='w-full h-72'
            source={{ uri: urlFor(data.image).url() }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='absolute top-14 left-4 bg-white p-4 rounded-full'
          >
            <FontAwesome6 name="arrow-left" size={20} color={colorThemes.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className='bg-white -mt-12 pt-6'>
          <View className='px-5' style={{ paddingBottom: cartItems.length ? 120 : 0}}>
            <Text className="text-3xl mb-3 font-bold">{data.name}</Text>
            <FetchStars ratings={data.rating} category={data.type.name} />
            <View className='flex-row mt-3 g
            ap-x-1'>
              <Icon.MapPin width={15} height={15} color={"grey"} />
              <Text className='text-gray-700 text-xs'>{data.address}</Text>
            </View>
            <Text className='font-bold text-2xl my-5'>Menu</Text>
            {data.dishes.map((dish: DisheType, index: React.Key | null | undefined) => (
              <DisheRow key={index} dish={dish} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
