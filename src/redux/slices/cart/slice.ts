import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCardLS } from "../../../utils/getCartFromLS";

import { CartSliceState, CartItem } from "./types";

const cardData = getCardLS();

const initialState: CartSliceState = {
  totalPrice: cardData.totalPrice,
  items: cardData.items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      findItem
        ? findItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
          });

      // state.totalPrice = state.items.reduce((sum, obj) => {
      //   return obj.newPrice * obj.count + sum;
      // }, 0);
      state.totalPrice = calcTotalPrice(state.items);
    },

    minuseItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      findItem && findItem.count--;

      if (findItem) {
        state.totalPrice -= findItem.newPrice;
      }
    },

    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      if (findItem) {
        state.totalPrice -= findItem.newPrice * findItem.count;
        state.items = state.items.filter((obj) => {
          return (
            obj.id !== action.payload.id ||
            obj.size !== action.payload.size ||
            obj.type !== action.payload.type
          );
        });
      }
    },
  },
});

export const { addItem, removeItem, clearItems, minuseItem } =
  cartSlice.actions;

export default cartSlice.reducer;
