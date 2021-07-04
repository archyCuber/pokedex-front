import React from "react";
import { usePageNumbers } from "./hooks/usePageNumbers";
import styles from "./styles/NavigationPanel.module.scss";
import classNames from "classnames";
import { Pagination } from "./Pagination";

interface IProps {
  pageNumber: number;
  paging: number;
  onChangePaging: (
    paging: number,
    startIndex: number,
    endIndex: number
  ) => void;
  onChangePageNumber: (
    pageNumber: number,
    startIndex: number,
    endIndex: number
  ) => void;
  onChangeExpected: (startIndex: number, endIndex: number) => void;
  maxPage: number;
}

export const NavigationPanel = (props: IProps) => {
  const { listOfPage } = usePageNumbers(props.pageNumber, props.maxPage);

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
                    const startIndex = (props.pageNumber - 1) * props.paging;
                    props.onChangePageNumber(
                      props.pageNumber - 1,
                      startIndex,
                      startIndex + props.paging
                    );
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
                      props.onChangePageNumber(
                        page,
                        page * props.paging,
                        page * props.paging + props.paging
                      );
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
                    const startIndex = (props.pageNumber + 1) * props.paging;
                    props.onChangePageNumber(
                      props.pageNumber + 1,
                      startIndex,
                      startIndex + props.paging
                    );
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
          onChange={(newPaging) =>
            props.onChangePaging(newPaging, 0, newPaging)
          }
        />
      </div>
    </div>
  );
};
