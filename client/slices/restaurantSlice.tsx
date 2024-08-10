import { createSlice } from "@reduxjs/toolkit";
import { RestaurantType } from "../types/RestaurantType";

type State = {
    restaurant: null | RestaurantType
}

const initialState: State = {
    restaurant: null
}

export const restaurnatSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        }
    }
})

export const { setRestaurant } = restaurnatSlice.actions

export const selectRestaurant = (state: any) => {
    return state.restaurant.restaurant as RestaurantType;
}

export default restaurnatSlice.reducer;