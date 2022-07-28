import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokedexes, Pokemon, PokemonSpecies } from 'pokenode-ts';
import { PokadexService } from './pokadex.service';

@Component({
  selector: 'app-pokadex',
  templateUrl: './pokadex.component.html',
  styleUrls: ['./pokadex.component.scss'],
})
export class PokadexComponent implements OnInit, OnDestroy {
  pageOfPokemons: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  start: number = 0;
  end: number = 100;
  numOfPages: number[];
  currentPageNumber: number;

  constructor(private pokadex: PokadexService, private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.callAPI();

    this.numOfPages = [];
    this.displayPokedex(this.start, this.end);
    this.getNumOfPages();
    this.currentPageNumber = 1;
  }

  ngOnDestroy(): void {
    this.pokadex.storePokedex();
  }

  async callAPI(): Promise<void> {
    // Only calls the API once
    if (this.pokadex.storedPokedex) {
      console.log(this.pokadex.pokedex);

      this.pokemons = this.pokadex.pokedex;
    } else {
      await this.pokadex.setPokedex();
      this.pokemons = this.pokadex.pokedex;
    }
  }

  displayPokedex(start: number, end: number) {
    this.pageOfPokemons = this.pokemons.slice(start, end);
  }

  getNumOfPages(): void {
    // Starts counting at page 2 since page 1 is already made in template
    for (let i = 1; i < this.pokadex.numOfPokemons; i++) {
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
