import React from "react";
import styles from "./styles/Pagination.module.scss";

export const Pagination = (props: {
  paging: number;
  onChange: (newPaging: number) => void;
}) => {
  return (
    <div>
      <nav className={styles.navigation}>
        <menu>
          <span>
            <a>{props.paging}</a>
            <menu>
              <span
                onClick={() => {
                  props.onChange(10);
                }}
              >
                <a>10</a>
              </span>
              <span
                onClick={() => {
                  props.onChange(15);
                }}
              >
                <a>15</a>
              </span>
              <span
                onClick={() => {
                  props.onChange(30);
                }}
              >
                <a>30</a>
              </span>
            </menu>
          </span>
        </menu>
      </nav>
    </div>
  );
};
