import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CartItem } from "../../redux/slices/cart/types";
import { addItem } from "../../redux/slices/cart/slice";

type PizzaBlockProps = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type CartItem2 = {
  id: string;
  type: string;
  size: number;
};

const typeNames = ["тонкое", "традиционное"];

const PizzaBlock: FC<PizzaBlockProps> = ({
  id,
  price,
  title,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);

  const [newPrice, setNewPrice] = useState(price);

  const cartItem = useSelector((state: any) =>
    state.cart.items.find(
      (obj: CartItem2) =>
        obj.id === id &&
        obj.type === typeNames[activeType] &&
        obj.size === sizes[activeSize]
    )
  );

  const count = cartItem ? cartItem.count : 0;

  const clickSize = (activeSize: number, price: number) => {
    switch (true) {
      case activeSize === 26:
        return price;
      case activeSize === 30:
        return Math.floor((price *= 1.1));
      case activeSize === 40:
        return Math.floor((price *= 1.2));
      default:
        return price;
    }
  };

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      newPrice,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? "active" : ""}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              onClick={() => {
                setActiveSize(i);
                setNewPrice(clickSize(size, price));
              }}
              className={activeSize === i ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {newPrice} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить</span>
          {<i>{count}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
