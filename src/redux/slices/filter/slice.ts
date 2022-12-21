import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortPropertyEnum, Sort, FilterSliceState } from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: sortPropertyEnum.RATING,
  },
  order: Boolean(null),
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setOrder(state, action: PayloadAction<boolean>) {
      state.order = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = action.payload.currentPage;
      state.order = action.payload.order;
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setOrder,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
