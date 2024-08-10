import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { FC } from 'react'
import { FeaturedType } from '../types/FeaturedType'
import { colorThemes } from '../theme'
import RestaurantCard from './RestaurantCard'
import { RestaurantType } from '../types/RestaurantType'
import { useNavigation } from "@react-navigation/native"

interface IFeaturedRow {
  featured: any;
  features: any;
}

const FeaturedRow: FC<IFeaturedRow> = ({ featured, features }) => {
  const navigation = useNavigation()
  return (
    <View>
      <View className='px-4 flex-row items-center overflow-visible justify-between'>
        <View>
          <Text className='font-bold text-lg'>{featured.name}</Text>
          <Text className='text-gray-500 text-xs'>{featured.description}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Feature", featured)}>
          <Text style={{ color: colorThemes.text }} className='font-semibold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal: 15
      }}>
        {
          featured.restaurants.map((restaurant: RestaurantType, index: React.Key | null | undefined) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default FeaturedRow