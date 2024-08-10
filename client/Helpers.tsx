import { FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { Text, View } from "react-native";
import { colorThemes } from "./theme";
import React from "react";

interface IFetchStars {
  ratings: number;
  category: string;
}

export const FetchStars: FC<IFetchStars> = ({ ratings, category }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name="star"
        size={18}
        color={i < ratings ? colorThemes.text : `${colorThemes.text}30`}
        solid={i < ratings}
      />
    );
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
      {stars}
      <Text> • {category}</Text>
    </View>
  );
};

export const restaurantSliceAddress = (address: string, count: number) => {
  return (
    address.length >= count ? address.slice(0, count) + " ..." : address
  )
}