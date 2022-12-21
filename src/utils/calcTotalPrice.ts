import { CartItem } from "../redux/slices/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.newPrice * obj.count + sum;
  }, 0);
};
