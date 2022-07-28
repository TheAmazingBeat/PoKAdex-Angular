import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { OfficialArtwork, Pokemon, PokemonSpecies } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  pokemonImgPath: string | null;

  constructor() {}

  ngOnInit(): void {
    this.pokemonImgPath = `/assets/images/pokemon/official-artwork/${this.pokemon.id}.png`;
  }

  logPokemon() {
    console.log(this.pokemon);
  }
}
