import React, { useEffect, useState } from "react";
import { LisOfPokemons } from "./LisOfPokemons";
import { NavigationPanel } from "./NavigationPanel";
import { observer } from "mobx-react";
import styles from "./styles/PokeTable.module.scss";
import pokemonsStore from "../../../Store/pokemonsStore";
import { Search } from "../../core/Search";
import { MultiSelect } from "../../core/MultiSelect";
import { useTypes } from "./hooks/useTypes";
import { Loader } from "../../core/Loader";

interface ITableSettings {
  page: number;
  paging: number;
  query: string;
  types: string[];
}

export const PokeTable = observer(() => {
  const [tableSettings, setTableSettings] = useState<ITableSettings>({
    page: 0,
    paging: 10,
    query: "",
    types: [],
  });
  const { listView, getPokemonsV2, load } = pokemonsStore;
  const types = useTypes();

  const queryToServerFormat = (query: string) => {
    return query.split(" ").join("-").toLowerCase();
  };

  useEffect(() => {
    tableSettings.query = queryToServerFormat(tableSettings.query);
    const filter = JSON.stringify(tableSettings);
    getPokemonsV2(filter);
  }, [tableSettings]);

  if (load) {
    return <Loader />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.searchPanel}>
        <Search
          onChangeFilter={(query: string) =>
            setTableSettings({ ...tableSettings, query: query })
          }
        />
        <MultiSelect
          value={tableSettings.types}
          onChange={(value) =>
            setTableSettings({ ...tableSettings, types: value.sort() })
          }
          source={types}
        />
      </div>
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
