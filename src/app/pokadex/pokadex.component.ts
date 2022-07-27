import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokedexes, Pokemon } from 'pokenode-ts';
import { PokadexService } from './pokadex.service';

@Component({
  selector: 'app-pokadex',
  templateUrl: './pokadex.component.html',
  styleUrls: ['./pokadex.component.scss'],
})
export class PokadexComponent implements OnInit {
  pokemons: Pokemon[];
  start: number = 0;
  end: number = 100;
  numOfPages: number[];
  currentPageNumber: number;

  constructor(
    private pokadex: PokadexService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.pokemons = [];
    this.numOfPages = [];

    // Detect changes in route params to change the page
    this.route.params.subscribe((params) => {
      this.currentPageNumber = +params['pageNumber'];
      if(this.currentPageNumber) this.changePage(this.currentPageNumber)
    });
    console.log(this.currentPageNumber);

    await this.displayPokedex(this.start, this.end);
    this.getNumOfPages();
  }

  async displayPokedex(start: number, end: number) {
    this.pokemons = await this.pokadex.getPokedex(start, end, Pokedexes.NATIONAL);
  }

  getNumOfPages() {
    // Starts counting at page 2 since page 1 is already made in template
    for (let i = 101; i < this.pokadex.numOfPokemons; i++) {
      if (i % 100 === 0) this.numOfPages.push(i / 100);
    }

    // Covers the remaining pokemon-cards
    this.numOfPages.push(this.numOfPages[this.numOfPages.length - 1] + 1);
  }

  changePage(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.start = 100 * pageNumber - 100;
    this.end = 100 * pageNumber;
    this.displayPokedex(this.start, this.end);
  }
}
