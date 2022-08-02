import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-basic-data',
  templateUrl: './pokemon-basic-data.component.html',
  styleUrls: ['./pokemon-basic-data.component.scss'],
})
export class PokemonBasicDataComponent implements OnInit {
  @Input('pokemon') pokemon: Pokemon;
  @Input('species') species: PokemonSpecies
  @Input('language') languageID: number

  constructor() {}

  ngOnInit(): void {}
}
