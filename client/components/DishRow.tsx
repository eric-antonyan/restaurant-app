import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { FC, useMemo } from 'react';
import { DisheType } from '../types/DisheType';
import { Minus, Plus } from 'react-native-feather';
import { colorThemes } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { makeSelectCartItemsById } from '../slices/cartSlice';
import { urlFor } from '../sanity';

interface IDishNow {
    dish: DisheType | undefined;
}

const DishRow: FC<IDishNow> = ({ dish }) => {

    const dispatch = useDispatch();

    // Check if dish is defined
    if (!dish) {
        return (
            <View className='flex-row items-center bg-white rounded-3xl shadow-2xl mb-3 mx-2'>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Create an instance of the memoized selector
    const selectCartItemsByIdMemoized = useMemo(makeSelectCartItemsById, []);
    const totalItems = useSelector((state) => selectCartItemsByIdMemoized(state, dish._id));

    const handleIncrease = () => {
        dispatch(addToCart({ ...dish }));
    };

    const handleDecrease = () => {
        dispatch(removeFromCart({ id: dish._id }));
    };

    return (
        <View className='flex-row items-center bg-white rounded-3xl mb-3'>
            <Image source={{ uri: urlFor(dish.image).url() }} className='rounded-3xl' style={{ width: 100, height: 100 }} />
            <View className='flex flex-1 space-y-3 pl-3'>
                <View>
                    <Text className='text-xl font-semibold'>{dish.name}</Text>
                    <Text className='text-gray-700'>{dish.description}</Text>
                </View>
                <View className='flex-row justify-between pr-3 items-center'>
                    <Text className='text-gray-600 font-bold'>
                        {new Intl.NumberFormat("en-US", {
                            currency: "USD",
                            style: "currency"
                        }).format(dish.price)}
                    </Text>
                    <View className='flex-row items-center gap-2'>
                        <TouchableOpacity
                            onPress={handleDecrease}
                            disabled={!totalItems.length}
                            style={{ backgroundColor: colorThemes.bgColor(1) }}
                            className='rounded-full p-1'
                        >
                            <Minus color={"white"} width={20} height={20} />
                        </TouchableOpacity>
                        <Text>{totalItems.length}</Text>
                        <TouchableOpacity
                            onPress={handleIncrease}
                            style={{ backgroundColor: colorThemes.bgColor(1) }}
                            className='rounded-full p-1'
                        >
                            <Plus color={"white"} width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DishRow;
