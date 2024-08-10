import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigate';
import { RestaurantType } from '../types/RestaurantType';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React, { FC } from 'react';
import { FetchStars, restaurantSliceAddress } from '../Helpers';
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from '../sanity';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Restaurant'>;

interface IRestaurantCard {
    restaurant: any;
}

const RestaurantCard: FC<IRestaurantCard> = ({ restaurant }) => {
    const navigation = useNavigation<NavigationProp>();
    const items: [string, RestaurantType] = ["Restaurant", restaurant];

    const navigateToRestaurant = () => {
        navigation.navigate("Restaurant", { items });
    };

    return (
        <TouchableWithoutFeedback onPress={navigateToRestaurant}>
            <View className='mr-6 bg-white rounded-3xl shadow-lg my-7'>
                <Image source={{ uri: urlFor(restaurant.image).url() }} className='h-36 w-64 rounded-t-3xl' />
                <View className='px-3 pb-4 space-y-2 bg-red'>
                    <Text className='text-lg font-bold pt-2 mb-2'>{restaurant.name}</Text>
                    <FetchStars ratings={restaurant.rating} category={restaurant.type.name} />
                    <View className='flex-row gap-x-1'>
                        <Icon.MapPin width={15} height={15} color={"grey"} />
                        <Text className='text-gray-700 text-xs'>{restaurantSliceAddress(restaurant.address, 20)}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default RestaurantCard;
