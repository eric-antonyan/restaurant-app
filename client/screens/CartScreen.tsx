import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import { colorThemes } from '../theme'
import { featured } from '../constants'
import bikeGuy from "../assets/bikeguy.png"
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../slices/restaurantSlice'
import { removeFromCart, selectCartItems, selectCartTotal } from '../slices/cartSlice'
import { NoSubstitutionTemplateLiteral } from 'typescript'
import { DisheType } from '../types/DisheType'
import { urlFor } from '../sanity'
import { SafeAreaView } from 'react-native-safe-area-context'

const CartScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const restaurant = useSelector(selectRestaurant)
    const cartTotal = useSelector(selectCartTotal)
    const cartItems = useSelector(selectCartItems)
    const [groupedItems, setGroupedItems] = useState({})

    const deliveryFee = 3;

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item)
            } else {
                group[item.id] = [item]
            }

            return group
        }, {})

        setGroupedItems(items)
    }, [cartItems])

    useEffect(() => {
        if (cartItems.length <= 0) {
            navigation.goBack()
        }
    }, [cartItems.length])

    return (
        <SafeAreaView className='flex-1' edges={Platform.OS === "ios" ? ['left', 'right'] : ['left', 'right', 'top']}>
            <View className='relative py-4'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-4 left-4 z-50 bg-white p-4 rounded-full'>
                    <FontAwesome6 name="arrow-left" size={20} color={colorThemes.bgColor(1)} />
                </TouchableOpacity>
                <View>
                    <Text className='text-center font-bold text-xl'>Your Cart</Text>
                    <Text className='text-center text-gray-500'>{restaurant.name}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: colorThemes.bgColor(0.2) }} className='px-4 z-0 py-5 flex-row items-center'>
                <Image className='w-20 h-20' source={bikeGuy} />
                <Text className='flex-1 pl-4'>Deliver in 20-30 minutes</Text>
                <TouchableOpacity>
                    <Text className='font-bold' style={{ color: colorThemes.text }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                {
                    Object.entries(groupedItems).reverse().map(([key, items], index) => {

                        const lastIndex = items.length - 1
                        return (
                            <View key={key} className='flex-row items-center py-4 relative rounded-xl justify-between px-4 bg-white mb-2'>
                                <View className='flex-row items-center space-x-3'>
                                    <Text>{items.length}x</Text>
                                    <Image source={{ uri: urlFor(items[lastIndex].image).url() }} className='h-14 w-14 rounded-full' />
                                    <View>
                                        <Text>{items[lastIndex].name}</Text>
                                    </View>
                                </View>
                                <View className='flex-row items-center gap-3'>
                                    <Text>{items[lastIndex].price}$</Text>
                                    <TouchableOpacity onPress={() => dispatch(removeFromCart({ id: items[lastIndex]._id }))}>
                                        <View style={{ backgroundColor: colorThemes.bgColor(1) }} className='p-1 rounded-full'>
                                            <Icon.Minus width={17} height={17} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>

            {/* tools */}
            <View className='p-6 px-8 rounded-t-3xl space-y-4' style={{ backgroundColor: colorThemes.bgColor(0.2) }}>
                <View className='flex-row justify-between'>
                    <Text>Subtotal</Text>
                    <Text>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(cartTotal)}</Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text>Delivery Fee</Text>
                    <Text>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(deliveryFee)}</Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text className='font-bold'>Order total</Text>
                    <Text className='font-bold'>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(cartTotal + deliveryFee)}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Delivery", null)} style={{ backgroundColor: colorThemes.bgColor(1) }} className='px-4 py-5 rounded-full'>
                        <Text className='text-center text-white'>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default CartScreen