import React, { useEffect, useState } from "react";
import InfoOfPokemonsHelper from "../../helpers/InfoOfPokemonsHelper";
import { IPokemonForm } from "../../models/PokemonForm";
import { LisOfPokemons } from "./PokemonTable/LisOfPokemons";
import { NavigationPanel } from "./PokemonTable/NavigationPanel";
import styles from "./PokemonTable/styles/TestSelect.module.scss";

export const PokeTable = () => {
  const [paging, setPaging] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState<IPokemonForm[]>([]);
  const [maxPage, setMaxPage] = useState(0);

  const fetch = async (paging: number, pageNumber: number) => {
    const result = await InfoOfPokemonsHelper.fetch(paging, pageNumber);
    setData(result.poke);
    setMaxPage(result.maxPage);
  };

  useEffect(() => {
    fetch(paging, pageNumber);
  }, [pageNumber, paging]);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        <LisOfPokemons list={data} />
      </div>
      <NavigationPanel
        pageNumber={pageNumber}
        paging={paging}
        onChangePaging={(paging) => setPaging(paging)}
        onChangePageNumber={(pageNumber) => setPageNumber(pageNumber)}
        maxPage={maxPage}
      />
    </div>
  );
};
