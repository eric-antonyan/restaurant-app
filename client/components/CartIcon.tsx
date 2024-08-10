import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colorThemes } from '../theme'
import { useNavigation } from "@react-navigation/native"
import { DisheType } from '../types/DisheType'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/Navigate'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../slices/cartSlice'

type NavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartIcon: FC = () => {
    const navigation = useNavigation<NavigationProp>()
    const cartItems = useSelector(selectCartItems)

    const cartTotal = useSelector(selectCartTotal as any)

    if (!cartItems.length) return;

    return (
        <View className='absolute bottom-5 w-full z-50'>
            <TouchableOpacity onPress={() => navigation.navigate("Cart", null)} style={{
                backgroundColor: colorThemes.bgColor(1)
            }} className='mx-5 px-4 py-3 rounded-full shadow-lg flex-row justify-between items-center'>
                <View className="p-2 px-4 block rounded-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                    <Text className='text-white text-lg font-bold'>{cartItems.length}</Text>
                </View>
                <Text className='font-extrabold text-center text-white flex-1 text-lg'>View Cart</Text>
                <Text className='font-extrabold text-white text-lg'>{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(cartTotal as number)}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartIcon