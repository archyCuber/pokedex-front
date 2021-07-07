import React from "react";
import { IPokemonForm } from "../../../models/PokemonForm";
import { Loader } from "../../core/Loader";
import styles from "./styles/PokemonModalContent.module.scss";
import classNames from "classnames";

export const PokemonModalContent = (props: {
  pokemon: IPokemonForm;
  show: boolean;
}) => {
  if (!props.show) {
    return <Loader />;
  }
  return (
    <div>
      <div className={styles.namePanel}>
        <img src={props.pokemon.sprites.front_default || ""} />
        <div>Name: {props.pokemon.name.split("-").join(" ")}</div>
      </div>
      <div className={styles.abilities}>
        Abilities:&nbsp;
        {props.pokemon.abilities.map((item: any, index: number) => {
          return (
            <div key={index}>
              {item.ability.name.split("-").join(" ")}
              {index !== props.pokemon.abilities.length - 1 ? <>,&nbsp;</> : ""}
            </div>
          );
        })}
      </div>
      <hr />
      <div className={styles.spacer}>
        Stats:
        <div className={styles.spacer}>
          {props.pokemon.stats.map((item: any, index: number) => {
            return (
              <div key={index}>
                {item.stat.name.split("-").join(" ")}: {item.base_stat}
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className={classNames(styles.spacer, styles.abilities)}>
        Types:&nbsp;
        {props.pokemon.types.map((item: any, index: number) => {
          return (
            <div key={index}>
              {item.type.name.split("-").join(" ")}
              {index !== props.pokemon.types.length - 1 ? <>,&nbsp;</> : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};
