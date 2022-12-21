export type CartItem = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
  newPrice: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
