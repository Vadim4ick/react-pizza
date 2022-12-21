import { FC } from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <>
      <h1 className={styles.root}>
        😡 <br /> Ничего не найдено
      </h1>

      <p className={styles.description}>
        К сожалению данная страница отсутствует
      </p>
    </>
  );
};

export default NotFoundBlock;
