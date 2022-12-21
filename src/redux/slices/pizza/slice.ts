import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  ResultData,
  Pizza,
  Status,
  PizzasSliceState,
  SearchPrizzaParams,
} from "./types";

const initialState: PizzasSliceState = {
  items: [],
  count: 1,
  status: Status.LOADING,
};

export const fetchPizzas2 = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: SearchPrizzaParams, thunkApi) => {
    const { search, category, orderFlag, currentPage, sortType } = params;

    const { data } = await axios.get<ResultData>(
      `https://635bfbb966f78741d58f2051.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=${orderFlag}${search}`
    );

    // if (data.items.length === 0) {
    //   return thunkApi.rejectWithValue("Пиццы пустые");
    // }

    // return thunkApi.fulfillWithValue(data);

    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas2.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas2.fulfilled, (state, action) => {
      // console.log(action, "fullfiled");

      state.items = action.payload.items;
      state.count = action.payload.count;
      state.status = Status.SUCCES;
    });
    builder.addCase(fetchPizzas2.rejected, (state) => {
      // console.log(action, "rejected");
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems, setCount } = pizzaSlice.actions;

export default pizzaSlice.reducer;
