import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import MapView, { Marker } from "react-native-maps"
import React from 'react'
import { featured } from '../constants'
import bikeGuy from "../assets/bikeguy.png"
import { colorThemes } from '../theme'
import rider from "../assets/rider.jpg"
import { FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../slices/restaurantSlice'
import { emptyCart } from '../slices/cartSlice'

const DevliveryScreen = () => {
    const restaurant = useSelector(selectRestaurant)
    const dispatch = useDispatch()

    const cancelOrder = () => {
        dispatch(emptyCart([]))
        navigation.navigate("Home", null)
    }

    const navigation = useNavigation()
    return (
        <View className='flex-1'>
            {/* map view */}

            <MapView initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }} className='flex-1' mapType='standard'>
                <Marker coordinate={{
                    latitude: restaurant.lat,
                    longitude: restaurant.lng,
                }} title={restaurant.name} />

            </MapView>
            <View className='rounded-t-3xl -mt-12 bg-white relative'>
                <View className='flex-row justify-between px-5 pt-10'>
                    <View className='mb-10'>
                        <Text className='text-lg text-gray-700 font-semibold'>Estimated Arrival</Text>
                        <Text className='text-3xl font-semibold'>20-30 minutes</Text>
                        <Text className='text-gray-700 mt-2 font-semibold'>You order is own in way!</Text>
                    </View>
                    <Image source={bikeGuy} className='w-24 h-24' />
                </View>
                <View style={{ backgroundColor: colorThemes.bgColor(0.8) }} className='p-3 my-7 mx-2 justify-between rounded-full flex-row items-center'>
                    <View className='flex-row items-center'>
                        <Image source={rider} className='w-16 h-16 rounded-full' />
                        <View className='pl-3'>
                            <Text className='text-white text-lg'>Will Smith</Text>
                            <Text className='text-white'>Your rider</Text>
                        </View>
                    </View>
                    <View className='flex-row gap-2 pr-2'>
                        <TouchableOpacity className='bg-[#fff] p-3 rounded-full'>
                            <FontAwesome6 name="phone" size={18} color={colorThemes.bgColor(0.8)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => cancelOrder()} className='bg-[#fff] p-3 px-[15px] rounded-full'>
                            <FontAwesome6 name="xmark" size={18} color={colorThemes.bgColor(0.8)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DevliveryScreen