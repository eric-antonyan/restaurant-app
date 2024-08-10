import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from "@react-navigation/native"
import { FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import { FetchStars, restaurantSliceAddress } from '../Helpers'
import { urlFor } from '../sanity'
import * as Icon from "react-native-feather";
import { RestaurantType } from '../types/RestaurantType'
import FeaturedRestaurant from '../components/FeaturedRestaurant'

const FeatureScreen = () => {
    const params = useRoute()
    const navigation = useNavigation()
    const data = params.params as any

    return (
        <SafeAreaView className='p-4'>
            <TouchableOpacity className='flex-row items-center gap-3 pb-4' onPress={() => navigation.goBack()}>
                <FontAwesome6 name="chevron-left" size={23} />
                <Text className='text-3xl font-bold'>{data.name}</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    data.restaurants.map((restaurant: any, index: number) => (
                        <FeaturedRestaurant key={index} restaurant={restaurant} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default FeatureScreen