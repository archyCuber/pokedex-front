import React, { useLayoutEffect, useState } from "react";
import { IPokemonForm } from "../../../models/PokemonForm";
import styles from "./styles/ListOfPokemons.module.scss";
import classNames from "classnames";

interface IProps {
  list: IPokemonForm[];
}

export const LisOfPokemons = ({ list }: IProps) => {
  const [active, setActive] = useState<number | null>(null);
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
      {list.map((pokemon, index) => {
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
          >
            <img
              className={styles.avatar}
              src={pokemon.sprites.front_default}
            />
          </div>
        );
      })}
    </div>
  );
};
