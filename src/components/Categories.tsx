import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useWhyDidYouUpdate } from "ahooks";
import { setCurrentPage } from "./../redux/slices/filter/slice";

type CatigoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Catigories: FC<CatigoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    // useWhyDidYouUpdate("Catigories", { value, onClickCategory });
    const dispath = useDispatch();

    // const { currentPage } = useSelector((state: any) => state.filterSlice);

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => {
                onClickCategory(index);
                dispath(setCurrentPage(1));
              }}
              className={value === index ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export default Catigories;
