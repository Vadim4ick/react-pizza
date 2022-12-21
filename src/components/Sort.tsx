import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useWhyDidYouUpdate } from "ahooks";

import { setSort } from "../redux/slices/filter/slice";
import { sortPropertyEnum } from "./../redux/slices/filter/types";

type SortItem = {
  name: string;
  sortProperty: sortPropertyEnum;
};

type SortProps = {
  onChangeOrder: () => void;
  order: boolean | null;
};

export const sortList: SortItem[] = [
  { name: "популярности", sortProperty: sortPropertyEnum.RATING },
  { name: "цене", sortProperty: sortPropertyEnum.PRICE },
  { name: "алфавиту", sortProperty: sortPropertyEnum.TITLE },
];

const Sort: FC<SortProps> = React.memo(({ onChangeOrder, order }) => {
  // useWhyDidYouUpdate("Sort", { onChangeOrder, order });

  const dispath = useDispatch();

  const sort = useSelector((state: any) => state.filterSlice.sort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispath(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handeleClickOutside = (e: MouseEvent) => {
      const path =
        sortRef.current && e.composedPath().includes(sortRef.current);

      if (!path) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handeleClickOutside);

    return () => {
      document.body.removeEventListener("click", handeleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <button
          className={order ? "active" : ""}
          onClick={() => onChangeOrder()}
          type="button"
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            ></path>
          </svg>
        </button>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen((val) => !val)}>{sort.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
                key={i}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
