import React, { FC } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { FetchStars, restaurantSliceAddress } from '../Helpers'
import { urlFor } from '../sanity'
import * as Icon from "react-native-feather";
import { RestaurantType } from '../types/RestaurantType'
import { useNavigation } from "@react-navigation/native"

interface IFeaturedRestaurant {
    restaurant: any
}

const FeaturedRestaurant: FC<IFeaturedRestaurant> = ({ restaurant }) => {

    const navigation = useNavigation()
    const items: [string, RestaurantType] = ["Restaurant", restaurant];

    const navigateToRestaurant = () => {
        navigation.navigate("Restaurant", { items });
    };

    return (
        <TouchableWithoutFeedback onPress={navigateToRestaurant}>
            <View className='mr-6 w-full bg-white rounded-3xl shadow-lg my-7'>
                <Image source={{ uri: urlFor(restaurant.image).url() }} className='h-44 w-full rounded-t-3xl' />
                <View className='px-3 pb-4 space-y-2 bg-red'>
                    <Text className='text-lg font-bold pt-2 mb-2'>{restaurant.name}</Text>
                    <FetchStars ratings={restaurant.rating} category={restaurant.type.name} />
                    <View className='flex-row gap-x-1'>
                        <Icon.MapPin width={15} height={15} color={"grey"} />
                        <Text className='text-gray-700 text-xs'>{restaurantSliceAddress(restaurant.address, 30уфы)}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FeaturedRestaurant