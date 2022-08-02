import { Component, Input, OnInit } from '@angular/core';
import { PokemonSpecies } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-breeding',
  templateUrl: './pokemon-breeding.component.html',
  styleUrls: ['./pokemon-breeding.component.scss']
})
export class PokemonBreedingComponent implements OnInit {
  @Input('species') species: PokemonSpecies
  stepsInCycle = 257;
  genderDivider = 0.08

  constructor() { }

  ngOnInit(): void {
  }

}
