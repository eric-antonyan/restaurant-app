import { RestaurantType } from '../types/RestaurantType';

export type RootStackParamList = {
    Restaurant: { items: [string, RestaurantType] };
};