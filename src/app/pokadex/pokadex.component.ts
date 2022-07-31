import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokedexes, Pokemon, PokemonSpecies } from 'pokenode-ts';
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
  numOfPages: number[];
  currentPageNumber: number;
  gameSubscription: Subscription;
  // prevPokedex: number[];

  constructor(
    private pokadex: PokadexService,
    private gameService: GameService
  ) {
    this.numOfPages = [];
    this.currentPageNumber = 1;
  }

  async ngOnInit() {
    this.gameSubscription = this.gameService.gameSelect.subscribe(
      async (selectedValue: number[]) => {
        await this.callAPI(selectedValue);
        console.log(selectedValue);
      }
    );

    await this.callAPI([1]);
    this.displayPokedex(this.start, this.end);
    this.getNumOfPages();
  }

  ngOnDestroy(): void {
    this.pokadex.storePokedex();
    this.gameSubscription.unsubscribe();
  }

  async callAPI(pokedexID: number[]): Promise<void> {
    // const prevArray = JSON.stringify(this.prevPokedex);
    // const chosenArray = JSON.stringify(pokedexID);
    // const compareGameSelection: boolean = prevArray === chosenArray;
    
    // Only calls the API once
    await this.pokadex.getStoredPokedex(pokedexID);
    this.pokemons = this.pokadex.pokemons;
    // TODO: Calls the API again if game selection was changed
  }

  displayPokedex(start: number, end: number) {
    this.pageOfPokemons = this.pokemons.slice(start, end);
  }

  getNumOfPages(): void {
    // Starts counting at page 2 since page 1 is already made in template
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
