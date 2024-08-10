import { View, Text, TextInput, ScrollView, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather";
import { colorThemes, pellete } from '../theme';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { getFeaturedRestaurants } from '../api';
import useLocation from '../hooks/useLocation';
import { restaurantSliceAddress } from '../Helpers';

export default function HomeScreen() {
    const [featureRestaurants, setFeatureRestaurants] = useState<any>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<any>([]);
    const [searchText, setSearchText] = useState("");

    const cityInfoPosition = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
    const cityInfoOpacity = useState(new Animated.Value(1))[0];

    const { longitude, latitude, response } = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFeaturedRestaurants();
                setFeatureRestaurants(data);
                setFilteredRestaurants(data); // Initialize filteredRestaurants with fetched data
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const filtered = featureRestaurants.filter((item: any) => {
            const lowercasedSearchText = searchText.toLowerCase().trim();

            const matchesName = item.name ? item.name.toLowerCase().includes(lowercasedSearchText) : false;
            const matchesDescription = item.description ? item.description.toLowerCase().includes(lowercasedSearchText) : false;

            const matchesNestedRestaurants = item.restaurants && item.restaurants.some((nestedItem: any) => {
                const nestedName = nestedItem.name ? nestedItem.name.toLowerCase() : '';
                const nestedTypeName = nestedItem.type && nestedItem.type.name ? nestedItem.type.name.toLowerCase() : '';

                return nestedName.includes(lowercasedSearchText) || nestedTypeName.includes(lowercasedSearchText);
            });

            const matchesNestedDishes = item.restaurants && item.restaurants.some((nestedItem: any) =>
                nestedItem.dishes && nestedItem.dishes.some((dish: any) => {
                    const dishName = dish.name ? dish.name.toLowerCase() : '';
                    const dishTypeName = dish.type && dish.type.name ? dish.type.name.toLowerCase() : '';

                    return dishName.includes(lowercasedSearchText) || dishTypeName.includes(lowercasedSearchText);
                })
            );

            return matchesName || matchesDescription || matchesNestedRestaurants || matchesNestedDishes;
        });

        setFilteredRestaurants(filtered);
    }, [searchText, featureRestaurants]);

    useEffect(() => {
        if (searchText) {
            console.log('Starting animation'); // Debugging log
            Animated.parallel([
                Animated.spring(cityInfoPosition, {
                    toValue: { x: 200, y: 0 },
                    useNativeDriver: false,
                }),
                Animated.timing(cityInfoOpacity, {
                    toValue: 0.5, // Reduced opacity
                    duration: 500,
                    useNativeDriver: false,
                }),
            ]).start();
        } else {
            console.log('Resetting animation'); // Debugging log
            Animated.parallel([
                Animated.spring(cityInfoPosition, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }),
                Animated.timing(cityInfoOpacity, {
                    toValue: 1, // Full opacity
                    duration: 500,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }, [searchText]);

    return (
        <SafeAreaView className='bg-[#fff]'>
            <StatusBar style='dark' />
            {/* Search Bar */}
            <View className='flex-row items-center space-x-2 px-4 pb-2'>
                <View className='flex-row flex-1 items-center p-4 border-[1px] overflow-hidden border-solid border-gray-300 rounded-full'>
                    <Icon.Search stroke={"gray"} width={"25"} height={"25"} />
                    <TextInput
                        onChangeText={(text) => setSearchText(text)}
                        className='ml-2'
                        placeholder='Search'
                        value={searchText} // Set the value of TextInput
                    />
                    <TouchableOpacity className='text-gray-600 ml-auto items-center space-x-1 flex-row pl-2'>

                        <Animated.View style={{
                            transform: [
                                {
                                    translateX: cityInfoPosition.x
                                },
                                {
                                    translateY: cityInfoPosition.y
                                }],
                            opacity: cityInfoOpacity // Apply opacity animation
                        }} className='text-gray-600 ml-auto items-center space-x-1 border-l-2 border-gray-300 flex-row pl-2'>
                            <Icon.MapPin color={"grey"} />
                            {
                                response ? <Text>{restaurantSliceAddress(response[0].country + (response[0].city ? ", " + response[0].city : ""), 10)}</Text> : ""
                            }
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <Animated.View style={{
                    backgroundColor: colorThemes.bgColor(1)
                }} className='p-3 rounded-full'>
                    <Icon.Sliders color={"white"} width={"20"} height={"20"} />
                </Animated.View>
            </View>
            {/* main */}
            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}
                showsVerticalScrollIndicator={false}
                className='overflow-visable py-5'
            >
                {/* categories */}
                <Categories />

                {/* featured */}
                {
                    filteredRestaurants.length > 0 ? (
                        <View className='mt-5'>
                            {
                                filteredRestaurants.map((item: any, index: number) => (
                                    <FeaturedRow key={index} featured={item} features={filteredRestaurants} />
                                ))
                            }
                        </View>
                    ) : <Text className='font-bold text-lg mx-3 mt-6'>No restaurants found</Text> 
                }
            </ScrollView>
        </SafeAreaView>
    );
}
