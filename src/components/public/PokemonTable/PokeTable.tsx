import React, { useEffect, useState } from "react";
import { LisOfPokemons } from "./LisOfPokemons";
import { NavigationPanel } from "./NavigationPanel";
import { observer } from "mobx-react";
import styles from "./styles/PokeTable.module.scss";
import pokemonsStore from "../../../Store/pokemonsStore";
import { Loader } from "../../core/Loader";

interface ITableSettings {
  page: number;
  paging: number;
  expectedItems: { startIndex: number; endIndex: number };
}

export const PokeTable = observer(() => {
  const { listView, getPokemonsV2, getMaxPage } = pokemonsStore;
  const [tableSettings, setTableSettings] = useState<ITableSettings>({
    page: 0,
    paging: 10,
    expectedItems: { startIndex: 0, endIndex: 0 },
  });

  useEffect(() => {
    const filter = JSON.stringify({
      page: tableSettings.page,
      paging: tableSettings.paging,
      query: "",
    });
    getPokemonsV2(filter);
  }, [tableSettings]);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        <LisOfPokemons list={listView} />
      </div>
      <NavigationPanel
        pageNumber={tableSettings.page}
        paging={tableSettings.paging}
        onChangePaging={(paging, start, end) =>
          setTableSettings({
            ...tableSettings,
            paging: paging,
            page: 0,
            expectedItems: {
              ...tableSettings.expectedItems,
              startIndex: start,
              endIndex: end,
            },
          })
        }
        onChangePageNumber={(pageNumber, start, end) =>
          setTableSettings({
            ...tableSettings,
            page: pageNumber,
            expectedItems: {
              ...tableSettings.expectedItems,
              startIndex: start,
              endIndex: end,
            },
          })
        }
        onChangeExpected={(start, end) =>
          setTableSettings({
            ...tableSettings,
            expectedItems: {
              ...tableSettings.expectedItems,
              startIndex: start,
              endIndex: end,
            },
          })
        }
        maxPage={getMaxPage}
      />
    </div>
  );
});
