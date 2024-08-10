import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../api';
import { urlFor } from '../sanity';

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    return (
        <View>
            {
                categories ? (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className='overflow-visible'
                        contentContainerStyle={{
                            paddingHorizontal: 15,
                        }}
                    >
                        {categories.map((category: any, index: number) => {
                            const isActive = category._id === activeCategory;

                            const btnClass = isActive ? 'bg-gray-300' : 'bg-gray-200';
                            const textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';

                            const imageUrl = urlFor(category.image).url();
                            const fallbackImageUrl = 'https://via.placeholder.com/45';

                            return (
                                <View key={index} className='flex justify-center items-center mr-6'>
                                    <TouchableOpacity
                                        onPress={() => setActiveCategory(category._id)}
                                        className={`p-1 rounded-full shadow ${btnClass}`}
                                    >
                                        <Image
                                            source={imageUrl ? { uri: imageUrl } : { uri: fallbackImageUrl }}
                                            className='w-[45px] h-[45px]'
                                        />
                                    </TouchableOpacity>
                                    <Text className={"mt-3 " + textClass}>{category.name}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                ) : ""
            }
        </View>
    );
}
