import InfoOfPokemonsHelper from "../helpers/InfoOfPokemonsHelper";
import { makeObservable, computed, observable, action, toJS } from "mobx";
import { IPokemonForm } from "../models/PokemonForm";
import { IFilter } from "../models/IFilter";

interface IStoreItem {
  [key: string]: { data: IPokemonForm[]; total: number };
}

class PokemonsStore {
  pokemonsList = {} as IStoreItem;
  pokemonsListView: { data: IPokemonForm[]; total: number } = {
    data: [],
    total: 0,
  };
  loader = false;
  names: string[] = [];
  maxPage = 0;
  maxPageSearch = 0;
  constructor() {
    makeObservable(this, {
      pokemonsListView: observable,
      maxPage: observable,
      maxPageSearch: observable,
      loader: observable,
      listView: computed,
      load: computed,
      getPokemonsV2: action,
      getMaxPage: computed,
    });
  }
  get listView() {
    return toJS(this.pokemonsListView);
  }

  get getMaxPage() {
    return toJS(this.maxPage);
  }

  get load() {
    return toJS(this.loader);
  }

  private setPokemonsListView = (newList: any) => {
    this.pokemonsListView = newList;
    this.setLoader(false);
  };

  private setMaxPage = (newMaxPage: number) => {
    this.maxPage = newMaxPage;
  };

  private setLoader = (loader: boolean) => {
    this.loader = loader;
  };

  private fetchPokemonsByFilter = async (filter: string) => {
    const filterObj: IFilter = JSON.parse(filter);
    const pokeList: IPokemonForm[] = [];
    for (let i = 0; i < filterObj.paging; i++) {
      const res = await InfoOfPokemonsHelper.getById(
        i + 1 + filterObj.page * filterObj.paging
      );
      if (res) {
        pokeList.push(res);
      }
    }
    return pokeList;
  };

  private fetchName = async () => {
    const res = await InfoOfPokemonsHelper.fetch(this.maxPage, 0, true);
    if (res) {
      this.names = res.map((name: any) => name.name);
    }
  };

  private getNames = (name: string, page: number, paging: number) => {
    const names = this.names.filter((item) => item.indexOf(name) === 0);
    if (names.length) {
      return {
        names: names.slice(page * paging, page * paging + paging),
        total: names.length,
      };
    }
    return false;
  };

  private searchByTypes = async (
    types: string[],
    page: number,
    paging: number,
    filter: string,
    name?: string
  ) => {
    let list: string[] = [];
    const pokemons: IPokemonForm[] = [];
    for (let i = 0; i < types.length; i++) {
      if (i === 0) {
        list = await InfoOfPokemonsHelper.fetchByTypes(types[i]);
      } else {
        const res = await InfoOfPokemonsHelper.fetchByTypes(types[i]);
        list = list.filter((item) => res.includes(item));
      }
    }
    const names = name
      ? list
          .filter((item) => item.indexOf(name) === 0)
          .slice(page * paging, page * paging + paging)
      : list.slice(page * paging, page * paging + paging);
    for (let i = 0; i < names.length; i++) {
      const res = await InfoOfPokemonsHelper.getByName(names[i]);
      if (res) {
        pokemons.push(res);
      }
    }
    this.pokemonsList[filter] = {
      data: pokemons,
      total: name
        ? list.filter((item) => item.indexOf(name) === 0).length
        : list.length,
    };
    return {
      data: pokemons,
      total: name
        ? list.filter((item) => item.indexOf(name) === 0).length
        : list.length,
    };
  };

  private searchPokemons = async (
    name: string,
    page: number,
    paging: number,
    filter: string
  ) => {
    const names = this.getNames(name, page, paging);
    const list: IPokemonForm[] = [];
    if (names) {
      for (let i = 0; i < names.names.length; i++) {
        const res = await InfoOfPokemonsHelper.getByName(names.names[i]);
        if (res) {
          list.push(res);
        }
      }
      this.pokemonsList[filter] = { data: list, total: names.total };
      return { data: list, total: names.total };
    }
    return false;
  };

  getPokemonsV2 = async (filter: string) => {
    const _filter = JSON.parse(filter);
    this.setLoader(true);
    if (!this.maxPage) {
      const res = await InfoOfPokemonsHelper.fetchCount();
      this.setMaxPage(res);
    }
    if (!this.names.length) {
      await this.fetchName();
    }
    if (this.pokemonsList[filter]) {
      this.setPokemonsListView(this.pokemonsList[filter]);
      return;
    }
    if (_filter.types.length) {
      const res = await this.searchByTypes(
        _filter.types,
        _filter.page,
        _filter.paging,
        filter,
        _filter.query
      );
      this.setPokemonsListView(res);
    } else if (_filter.query) {
      const res = await this.searchPokemons(
        _filter.query,
        _filter.page,
        _filter.paging,
        filter
      );
      this.setPokemonsListView(res);
    } else {
      const res = await this.fetchPokemonsByFilter(filter);
      this.pokemonsList[filter] = { data: res, total: this.maxPage };
      this.setPokemonsListView({ data: res, total: this.maxPage });
    }
  };
}

export default new PokemonsStore();
