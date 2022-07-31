import { EventEmitter, Injectable } from '@angular/core';
import { gameOptions } from './game.list';

@Injectable({ providedIn: 'root' })
export class GameService {
  listOfGames = gameOptions;
  gameSelect: EventEmitter<number[]> = new EventEmitter<number[]>();
  selectedGameID: number[];

  constructor() {}

  get game() {
    return this.selectedGameID;
  }

  set game(selected: number[]) {
    this.selectedGameID = selected;
  }
}
