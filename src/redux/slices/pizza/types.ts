export type ResultData = {
  count: number;
  items: Pizza[];
};

export type Pizza = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
};

export enum Status {
  LOADING = "loading",
  SUCCES = "succes",
  ERROR = "error",
}

export interface PizzasSliceState {
  items: Pizza[];
  count: number;
  status: Status;
}

export type SearchPrizzaParams = {
  search: string;
  category: string;
  orderFlag: string;
  currentPage: string;
  sortType: string;
};
