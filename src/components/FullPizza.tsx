import { FC, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import axios from "axios";

const FullPizza: FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://635bfbb966f78741d58f2051.mockapi.io/items/${id}`
        );
        setPizza(data.items);
      } catch (error) {
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <Link to="/" className="button button--outline button--add">
        Назад
      </Link>
    </div>
  );
};

export default FullPizza;
