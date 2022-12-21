import React, { FC } from "react";
// import { useWhyDidYouUpdate } from "ahooks";

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

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
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
