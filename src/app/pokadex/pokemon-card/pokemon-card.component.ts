import { Component, Input, OnInit } from '@angular/core';
import { OfficialArtwork, Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  pokemonImgPath: string | null;

  constructor() { }

  ngOnInit(): void {
    this.pokemonImgPath = this.pokemon.sprites.other['official-artwork'].front_default
  }

  logPokemon(){
    console.log(this.pokemon);
    
  }

}
