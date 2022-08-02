import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Pokemon,
  PokemonAbility,
  PokemonSpecies,
  PokemonStat,
  PokemonType,
} from 'pokenode-ts';
import { PokadexService } from '../pokadex.service';
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
  tabs = ['Stats', 'Evolution', 'Encounters', 'Moves', 'Forms', 'Breeding'];

  constructor(
    private route: ActivatedRoute,
    private pokadex: PokadexService,
    private pokemonService: PokemonService
  ) {}

  async ngOnInit(): Promise<void> {
    this.name = this.route.snapshot.params['name'];
    await this.pokemonService.getSpecies(this.name);
    this.species = this.pokemonService.species;
    this.id = this.species.id;
    await this.pokemonService.getPokemon(this.id);
    this.pokemon = this.pokemonService.pokemon;
    this.pokemonImgPath = `/assets/images/pokemon/official-artwork/${this.pokemon.id}.png`;
    console.log(this.pokemon);
    console.log(this.species);
  }
}
