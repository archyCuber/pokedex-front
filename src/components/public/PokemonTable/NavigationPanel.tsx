import React from "react";
import { usePageNumbers } from "./hooks/usePageNumbers";
import styles from "./styles/NavigationPanel.module.scss";
import classNames from "classnames";
import { Pagination } from "./Pagination";

interface IProps {
  pageNumber: number;
  paging: number;
  onChangePaging: (paging: number) => void;
  onChangePageNumber: (pageNumber: number) => void;
  maxPage: number;
}

export const NavigationPanel = (props: IProps) => {
  const { listOfPage } = usePageNumbers(
    props.pageNumber,
    props.maxPage,
    props.paging
  );

  return (
    <div className={styles.root}>
      <div className={styles.pagesList}>
        <div className={styles.container}>
          <ul className={styles.pagination}>
            <li className={styles["page-item"]}>
              <div
                className={styles["page-link"]}
                onClick={() => {
                  if (props.pageNumber !== 0) {
                    props.onChangePageNumber(props.pageNumber - 1);
                  }
                }}
              />
            </li>
            {listOfPage.map((page, index) => {
              return (
                <li
                  key={index}
                  className={classNames(
                    styles["page-item"],
                    props.pageNumber === page ? styles["active"] : ""
                  )}
                >
                  <div
                    className={styles["page-link"]}
                    onClick={() => {
                      props.onChangePageNumber(page);
                    }}
                  >
                    {page + 1}
                  </div>
                </li>
              );
            })}
            <li className={styles["page-item"]}>
              <div
                className={styles["page-link"]}
                onClick={() => {
                  if (
                    !(
                      props.pageNumber + 1 >=
                      Math.round(props.maxPage / props.paging)
                    )
                  ) {
                    props.onChangePageNumber(props.pageNumber + 1);
                  }
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Pagination
          paging={props.paging}
          onChange={(newPaging) => props.onChangePaging(newPaging)}
        />
      </div>
    </div>
  );
};
