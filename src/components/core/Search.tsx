import React, { useState } from "react";
import styles from "./styles/Search.module.scss";

export const Search = (props: { onChangeFilter: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.searchBox}>
      <button
        onClick={() => {
          props.onChangeFilter(query);
        }}
        className={styles.btnSearch}
      >
        <i className={"fa fa-search"} />
      </button>
      <input
        className={styles.inputSearch}
        placeholder="Type to Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
