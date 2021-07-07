import React, { useLayoutEffect, useState } from "react";
import { IPokemonForm } from "../../../models/PokemonForm";
import styles from "./styles/ListOfPokemons.module.scss";
import classNames from "classnames";
import { ModalDialog } from "../../core/ModalDialog";
import { PokemonModalContent } from "./PokemonModalContent";

interface IProps {
  list: IPokemonForm[];
}

interface IModalState {
  show: boolean;
  pokemon: IPokemonForm;
}

export const LisOfPokemons = ({ list }: IProps) => {
  const [active, setActive] = useState<number | null>(null);
  const [modalState, setModalState] = useState<IModalState>({} as IModalState);
  const cards = document.querySelectorAll("#card");
  useLayoutEffect(() => {
    if (cards) {
      const fCardRotate = (e: any) => {
        const test = `perspective(2000px) rotatey(${
          (e.offsetX - e.target.offsetWidth / 2) / 6
        }deg) rotatex(${
          ((e.offsetY - e.target.offsetHeight / 2) / 6) * -1
        }deg)`;
        e.target.style.transform = test;
      };
      cards.forEach((el) => {
        el.addEventListener("mousemove", fCardRotate);
      });

      return () => {
        cards.forEach((el) => {
          el.removeEventListener("mousemove", fCardRotate);
        });
      };
    }
  }, [cards]);

  return (
    <div className={styles.cards}>
      <ModalDialog
        open={modalState.show}
        handleClose={() => setModalState({ ...modalState, show: false })}
        title={"Info of pokemon"}
        content={
          <PokemonModalContent
            show={modalState.show}
            pokemon={modalState.pokemon}
          />
        }
      />
      {list && list.length ? (
        list.map((pokemon, index) => {
          return (
            <div
              id={"card"}
              onMouseOver={() => {
                setActive(index);
              }}
              onMouseLeave={() => {
                setActive(null);
              }}
              className={classNames(
                styles.card,
                active === index ? styles.active : ""
              )}
              style={{
                background: `url(https://kurgan.mir-kvestov.ru/uploads/quests/15301/original/kidrum_robloks_photo1.jpg?1606731108)`,
              }}
              key={index}
              onClick={() =>
                setModalState({ ...modalState, show: true, pokemon })
              }
            >
              <img
                className={styles.avatar}
                src={pokemon.sprites.front_default}
              />
              <div>{pokemon.name}</div>
              <div className={styles.types}>
                Types:&nbsp;
                {pokemon.types.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      {item.type.name.split("-").join(" ")}
                      {index !== pokemon.types.length - 1 ? <>,&nbsp;</> : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.label}>Nothing to show</div>
      )}
    </div>
  );
};
