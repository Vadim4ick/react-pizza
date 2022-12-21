import { FC, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filter/slice";

import styles from "./Serch.module.scss";

const Serch: FC = () => {
  const dispath = useDispatch();

  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispath(setSearchValue(""));
    setValue("");

    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispath(setSearchValue(str));
    }, 300),
    []
  );

  const onChangeInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 487.95 487.95"
        className={styles.icon}
      >
        <g>
          <path
            d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
          />
        </g>
      </svg>

      <input
        value={value}
        onChange={(e) => onChangeInp(e)}
        className={styles.input}
        ref={inputRef}
        placeholder="Поиск..."
      />

      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clear}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 371.23 371.23"
        >
          <polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23   185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 " />
        </svg>
      )}
    </div>
  );
};

export default Serch;
