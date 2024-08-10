import { createSlice } from "@reduxjs/toolkit";
import { DisheType } from "../types/DisheType";
import { createSelector } from 'reselect';

type State = {
    items: DisheType[]
}

const initialState: State = {
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromCart: (state, action) => {
            let newCart = [...state.items];
            const itemIndex = state.items.findIndex((item) => item._id === action.payload.id);
            itemIndex >= 0 ? newCart.splice(itemIndex, 1) : console.log("Can't remove the item that is not added to cart!");
            state.items = newCart;
        },
        emptyCart: (state, action) => {
            state.items = [];
        },
    }
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: { items: DisheType[] } }) => state.cart.items;

// Memoized selector for selectCartItemsById
export const makeSelectCartItemsById = () => createSelector(
    [selectCartItems, (state, id) => id],
    (items, id) => items.filter((item) => item._id === id)
);

export const selectCartTotal = (state: { cart: { items: DisheType[] } }) => state.cart.items.reduce((total: number, item: DisheType) => (
    total + item.price
), 0);

export default cartSlice.reducer;
