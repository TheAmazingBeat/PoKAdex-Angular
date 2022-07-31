import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { OfficialArtwork, Pokemon, PokemonSpecies } from 'pokenode-ts';
import { PokemonModel } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: PokemonModel;
  pokemonImgPath: string | null;

  constructor() {}

  ngOnInit(): void {
    this.pokemonImgPath = `/assets/images/pokemon/official-artwork/${this.pokemon.id}.png`;
  }

  logPokemon() {
    console.log(this.pokemon);
  }
}
