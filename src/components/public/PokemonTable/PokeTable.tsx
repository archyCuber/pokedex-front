import React, { useEffect, useState } from "react";
import { LisOfPokemons } from "./LisOfPokemons";
import { NavigationPanel } from "./NavigationPanel";
import { observer } from "mobx-react";
import styles from "./styles/PokeTable.module.scss";
import pokemonsStore from "../../../Store/pokemonsStore";
import { Search } from "../../core/Search";

interface ITableSettings {
  page: number;
  paging: number;
  query: string;
}

export const PokeTable = observer(() => {
  const { listView, getPokemonsV2 } = pokemonsStore;
  const [tableSettings, setTableSettings] = useState<ITableSettings>({
    page: 0,
    paging: 10,
    query: "",
  });

  useEffect(() => {
    const filter = JSON.stringify({
      page: tableSettings.page,
      paging: tableSettings.paging,
      query: tableSettings.query,
    });
    getPokemonsV2(filter);
  }, [tableSettings]);

  return (
    <div className={styles.root}>
      <Search
        onChangeFilter={(query: string) =>
          setTableSettings({ ...tableSettings, query: query })
        }
      />
      <div className={styles.list}>
        <LisOfPokemons list={listView.data} />
      </div>
      <NavigationPanel
        pageNumber={tableSettings.page}
        paging={tableSettings.paging}
        onChangePaging={(paging) =>
          setTableSettings({
            ...tableSettings,
            paging: paging,
            page: 0,
          })
        }
        onChangePageNumber={(pageNumber) =>
          setTableSettings({
            ...tableSettings,
            page: pageNumber,
          })
        }
        maxPage={listView.total}
      />
    </div>
  );
});
