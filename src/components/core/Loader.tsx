import React from "react";
import styles from "./styles/Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.shadow} />
      <div className={styles.shadow} />
      <div className={styles.shadow} />
    </div>
  );
};
