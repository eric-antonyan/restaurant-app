import { DisheType } from "./DisheType";

export type RestaurantType = {
    id: number,
    name: string,
    image: string,
    lng: number, 
    lat: number,
    address: string,
    stars: number,
    reviews: number,
    category: string,
    dishes: Array<DisheType>,
}