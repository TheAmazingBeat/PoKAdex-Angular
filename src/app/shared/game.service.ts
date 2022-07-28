import { Injectable } from '@angular/core';
import {
  GameClient,
  Generation,
  NamedAPIResourceList,
  VersionGroup,
} from 'pokenode-ts';

@Injectable({ providedIn: 'root' })
export class GameService {
  selectedGen: any;
  selectedGame: any;
  listOfGens: NamedAPIResourceList;
  listOfGames: VersionGroup[];

  constructor() {}

  get generation() {
    return this.selectedGen;
  }

  get game() {
    return this.selectedGame;
  }

  get generations() {
    // this.listOfGens = this.getListOfGens;
    return this.listOfGens;
  }

  set generation(gen: any) {
    this.selectedGen = gen;
  }

  set game(something: any) {
    this.selectedGame = something;
  }

  async getListOfGens() {
    const api = new GameClient();
    return await api
      .listGenerations()
      .then((data) => {
        return data.results;
      })
      .catch((error) => {
        return error;
      });
  }
}
