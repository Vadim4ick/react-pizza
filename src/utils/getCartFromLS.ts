import { calcTotalPrice } from "./calcTotalPrice";

export const getCardLS = () => {
  const localCart = localStorage.getItem("cart");
  const items = localCart ? JSON.parse(localCart) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items,
    totalPrice: totalPrice,
  };
};
