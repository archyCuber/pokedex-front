import InfoOfPokemonsHelper from "../helpers/InfoOfPokemonsHelper";
import { makeObservable, computed, observable, action, toJS } from "mobx";
import { IPokemonForm } from "../models/PokemonForm";
import { IFilter } from "../models/IFilter";

interface IStoreItem {
  [key: string]: IPokemonForm[];
}

class PokemonsStore {
  pokemonsList = {} as IStoreItem;
  pokemonsListView: IPokemonForm[] = [];
  loader = false
  maxPage = 100;
  constructor() {
    makeObservable(this, {
      pokemonsListView: observable,
      maxPage: observable,
      listView: computed,
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

  private setPokemonsListView = (newList: any) => {
    this.pokemonsListView = newList;
  };

  private setMaxPage = (newMaxPage: number) => {
    this.maxPage = newMaxPage;
  };

  // private getForPage = (
  //   paging: number,
  //   pageNumber: number,
  //   startIndex: number,
  //   endIndex: number
  // ) => {
  //   const pokeList = this.pokemonsList.slice(startIndex, endIndex);
  //   // for (let i = pageNumber * paging; i < pageNumber * paging + paging; i++) {
  //   //   if (this.pokemonsList[i]) {
  //   //     pokeList.push(this.pokemonsList[i]);
  //   //   }
  //   // }
  //   let trueLength = 0;
  //
  //   pokeList.forEach(() => ++trueLength);
  //
  //   return { pokeList, trueLength };
  // };

  // private fetchPokemons = async (paging: number, pageNumber: number) => {
  //   const res = await InfoOfPokemonsHelper.fetch(paging, pageNumber);
  //   res.poke.forEach((item, index) => {
  //     this.pokemonsList[pageNumber * paging + index] = item;
  //   });
  //   this.setMaxPage(res.maxPage);
  //   this.setPokemonsListView(res.poke);
  // };

  // private fetchByIds = async (start: number, end: number) => {
  //   for (let i = start; i < end; i++) {
  //     const res = await InfoOfPokemonsHelper.getById(i);
  //     if (res) {
  //       this.pokemonsListView.push(res);
  //       if (!this.pokemonsList[i - 1]) {
  //         this.pokemonsList[i - 1] = res;
  //       }
  //     }
  //   }
  // };

  // private fetchMissings = async (
  //   list: IPokemonForm[],
  //   page: number,
  //   paging: number
  // ) => {
  //   for (let i = 0; i < paging; i++) {
  //     if (!list[i]) {
  //       const res = await InfoOfPokemonsHelper.getById(i + 1 + page * paging);
  //       if (res) {
  //         list[i] = res;
  //         this.pokemonsList[i + page * paging] = res;
  //       }
  //     }
  //   }
  // };

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

  getPokemonsV2 = async (filter: string) => {
    if (!this.maxPage) {
      this.setMaxPage(1118);
    }
    if (this.pokemonsList[filter]) {
      this.setPokemonsListView(this.pokemonsList[filter]);
    } else {
      const res = await this.fetchPokemonsByFilter(filter);
      this.pokemonsList[filter] = res;
      this.setPokemonsListView(res);
    }
  };

  // getPokemons = async (
  //   paging: number,
  //   pageNumber: number,
  //   startIndex: number,
  //   endIndex: number
  // ) => {
  //   const listForPage = this.getForPage(
  //     paging,
  //     pageNumber,
  //     startIndex,
  //     endIndex
  //   );
  //   console.log("DD list for page", listForPage);
  //   if (listForPage.trueLength !== paging) {
  //     await this.fetchMissings(listForPage.pokeList, pageNumber, paging);
  //   }
  //   this.setPokemonsListView(listForPage.pokeList);
  //   // if (listForPage && listForPage.length < paging - 1) {
  //   //   await this.fetchByIds(
  //   //     listForPage[listForPage.length - 1].id + 1,
  //   //     pageNumber * paging + paging + 1
  //   //   );
  //   // } else if (!listForPage) {
  //   //   await this.fetchPokemons(paging, pageNumber);
  //   // } else {
  //   //   this.setPokemonsListView(listForPage);
  //   // }
  // };
}

export default new PokemonsStore();
