import { FC, useCallback, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Catigories from "../Categories";
import Sort, { sortList } from "../Sort";
import PizzaBlock from "../PizzaBlock";
import Skeleton from "../PizzaBlock/Skeleton";
import Paggination from "../Pagination";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setOrder,
} from "../../redux/slices/filter/slice";

import { fetchPizzas2 } from "../../redux/slices/pizza/slice";
import { useAppDispatch } from "./../../redux/store";

type PizzasElement = {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

const Home: FC = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {
    searchValue,
    categoryId,
    order: orderType,
    currentPage,
  } = useSelector((state: any) => state.filterSlice);

  const sortType = useSelector(
    (state: any) => state.filterSlice.sort.sortProperty
  );

  const { items, count, status } = useSelector((state: any) => state.pizza);

  const onChangePage = (number: number) => {
    dispath(setCurrentPage(number));
  };

  const onChangeCategory = useCallback((id: number) => {
    dispath(setCategoryId(id));
  }, []);

  const onChangeOrder = useCallback(() => {
    dispath(setOrder(!orderType));
  }, []);

  const fetchPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const orderFlag = Boolean(orderType) === true ? "desc" : "asc";

    dispath(
      fetchPizzas2({ search, category, orderFlag, currentPage, sortType })
    );
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const orderFlag = orderType === true ? "desc" : "asc";

      const queryStr = qs.stringify({
        sortType: sortType,
        categoryId: categoryId,
        currentPage: currentPage,
        order: orderFlag,
      });

      navigate(`?${queryStr}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, orderType, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);
      // const order = params.order === "desc" ? true : false;

      dispath(
        setFilters({
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : sortList[0],
          order: params.order === "desc" ? true : false,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if ((!isSearch.current && orderType) || !orderType) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((obj: PizzasElement) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  const sceletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Catigories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort onChangeOrder={onChangeOrder} order={orderType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы, попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? sceletons : pizzas}
        </div>
      )}

      <Paggination
        count={count}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
