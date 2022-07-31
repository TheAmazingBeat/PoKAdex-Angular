import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../shared/game.service';
import { PokadexService } from './pokadex.service';
import { PokemonModel } from './pokemon.model';

@Component({
  selector: 'app-pokadex',
  templateUrl: './pokadex.component.html',
  styleUrls: ['./pokadex.component.scss'],
})
export class PokadexComponent implements OnInit, OnDestroy {
  pageOfPokemons: PokemonModel[] = [];
  pokemons: PokemonModel[] = [];
  start: number = 0;
  end: number = 100;
  numOfPages: number[] = [];
  currentPageNumber: number = 1;
  gameSubscription: Subscription;
  prevPokedex: number[];

  constructor(
    private pokadex: PokadexService,
    private gameService: GameService
  ) {}

  async ngOnInit() {
    // Gets national dex if there is no previous selected
    this.prevPokedex =
      this.gameService.game === null ? [1] : this.gameService.game;
    this.gameSubscription = this.gameService.gameSelect.subscribe(
      async (selectedValue: number[]) => {
        this.pokemons = [];
        await this.callAPI(selectedValue);
        this.displayPokedex(this.start, this.end);
      }
    );

    await this.callAPI(this.prevPokedex);
    this.displayPokedex(this.start, this.end);
  }

  ngOnDestroy(): void {
    this.pokadex.storePokedex();
    this.gameSubscription.unsubscribe();
  }

  async callAPI(pokedexID: number[]): Promise<void> {
    const prevArray = JSON.stringify(this.prevPokedex);
    const chosenArray = JSON.stringify(pokedexID);
    const compareGameSelection: boolean = prevArray === chosenArray;

    // Only calls the API once
    await this.pokadex.getStoredPokedex(pokedexID, compareGameSelection);
    this.pokemons = this.pokadex.pokemons;
    this.prevPokedex = pokedexID;
  }

  displayPokedex(start: number, end: number) {
    this.start = 0;
    this.end = 100;
    this.numOfPages = [];
    this.currentPageNumber = 1;
    this.pageOfPokemons = this.pokemons.slice(start, end);
    this.getNumOfPages();
  }

  getNumOfPages(): void {
    for (let i = 1; i < this.pokemons.length; i++) {
      if (i % 100 === 0) this.numOfPages.push(i / 100);
    }
    // Covers the remaining pokemon-cards
    this.numOfPages.push(this.numOfPages[this.numOfPages.length - 1] + 1);
  }

  onChangePage(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.start = 100 * pageNumber - 100;
    this.end = 100 * pageNumber;
    this.displayPokedex(this.start, this.end);
  }

  isActive(n: number) {
    return this.currentPageNumber === n;
  }
}
