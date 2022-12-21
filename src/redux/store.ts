import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filterSlice from "./slices/filter/slice";
import cart from "./slices/cart/slice";
import pizza from "./slices/pizza/slice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cart,
    pizza,
  },
});

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
