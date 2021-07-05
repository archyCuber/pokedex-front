import axios from "axios";
import { IPokemonForm } from "../models/PokemonForm";

class InfoOfPokemonsHelper {
  public fetch = async (paging: number, pageNumber: number, onlyNames?: boolean) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${paging}&offset=${
      paging * pageNumber
    }`;
    const result = await axios.get(url);
    if (onlyNames) {
      return result.data.results
    }
    const poke = await this.pushPokemons(result.data.results);
    const maxPage = result.data.count;
    return { poke, maxPage };
  };

  public pushPokemons = async (list: any[]) => {
    const result = [] as IPokemonForm[];
    for (const item of list) {
      const res = await this.getByName(item.name);
      result.push(res);
    }
    return result;
  };

  public getById = async (id: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await axios.get(url);
    return result && result.data ? result.data : "error";
  };

  public getByName = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const result = await axios.get(url);
    return result.data || "error";
  };
}

export default new InfoOfPokemonsHelper();
