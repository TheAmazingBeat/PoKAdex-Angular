import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Pokemon,
  PokemonAbility,
  PokemonSpecies,
  PokemonStat,
  PokemonType,
} from 'pokenode-ts';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon;
  species: PokemonSpecies;
  id: number;
  name: string;
  pokemonImgPath: string;
  tabs = ['Stats', 'Evolution', 'Encounters', 'Moves', 'Forms'];
  chainID: number;
  languageID = 7;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.name = params['name'];
      this.render();
    });
    this.render();
  }

  async render() {
    this.species = await this.pokemonService.getSpecies(this.name);
    this.id = this.species.id;
    this.pokemon = await this.pokemonService.getPokemon(this.id);
    this.pokemonImgPath = `/assets/images/pokemon/official-artwork/${this.pokemon.id}.png`;
    const ID_INDEX = 42;
    const chainURL = this.species.evolution_chain.url;
    this.chainID = +chainURL.substring(ID_INDEX, chainURL.length - 1);
  }
}
