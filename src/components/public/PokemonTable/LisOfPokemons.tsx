import React from "react";
import { IPokemonForm } from "../../../models/PokemonForm";
import styles from "./testtyle.module.scss";

interface IProps {
  list: IPokemonForm[];
}

export const LisOfPokemons = ({ list }: IProps) => {
  return (
    <div className={styles.root}>
      {list.map((pokemon, index) => {
        return (
          <div className={styles.item} key={index}>
            <img src={pokemon.sprites.front_default} />
          </div>
        );
      })}
    </div>
  );
};
