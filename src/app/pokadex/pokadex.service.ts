import { Injectable } from '@angular/core';
import { Pokedexes, Pokemon, PokemonEntry, MainClient } from 'pokenode-ts';
import { PokemonModel } from './pokemon.model';
const API_ROOT: string = 'https://pokeapi.co/api/v2';

@Injectable({ providedIn: 'root' })
export class PokadexService {
  listOfPokemons: PokemonModel[];
  // storedPokedex: boolean = false;
  api = new MainClient({
    cacheOptions: {
      maxAge: 10000,
      exclude: { query: false },
    },
  });
  pokedex: PokemonEntry[];

  constructor() {}

  get pokemons() {
    return this.listOfPokemons.slice();
  }

  storePokedex() {
    localStorage.setItem('pokedex', JSON.stringify(this.listOfPokemons));
  }

  async getStoredPokedex(pokedexID: number[], newGameSelection: boolean) {
    const item = localStorage.getItem('pokedex')!;
    if (item && newGameSelection) {
      this.listOfPokemons = JSON.parse(item);
    } else {
      this.listOfPokemons = await this.getPokedex(pokedexID[0]);
      this.storePokedex();
    }
  }

  async getPokedex(pokedexID: number): Promise<PokemonModel[]> {
    const ID_INDEX = 42;

    return await this.api.game
      .getPokedexById(pokedexID)
      .then(async (data) => {
        // Process Data Entries
        this.pokedex = data.pokemon_entries;

        return await Promise.all(
          this.pokedex.map(async (entry) => {
            // The ID of the pokemon is included in the URL
            const pokemonURL = entry.pokemon_species.url;
            const id = pokemonURL.substring(ID_INDEX, pokemonURL.length - 1);
            const pokemon: Pokemon = await this.getPokemon(id);
            const filteredPokemon = this.filterPokemonProperties(pokemon);

            return filteredPokemon;
          })
        );
      })
      .catch((error) => {
        return error;
      });
  }

  async getPokemon(id: string): Promise<Pokemon> {
    return await this.api.pokemon
      .getPokemonById(+id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  totalChars: number = 0;
  filterPokemonProperties(p: Pokemon): PokemonModel {
    const pokemon: PokemonModel = {
      id: p.id,
      name: p.name,
      // base_experience: p.base_experience,
      // abilities: p.abilities,
      // forms: p.forms,
      // game_indices: p.game_indices,
      // location_area_encounters: p.location_area_encounters,
      // moves: p.moves,
      // species: p.species,
      // stats: p.stats,
      types: p.types,
    };
    const stringLength = JSON.stringify(pokemon).length;
    this.totalChars += stringLength;
    // console.log(this.totalChars);
    return pokemon;
  }

  /**
   * TO DO LIST:
   * - getPokemonSpecies() ---> FOR POKEMON COMPONENT & DETERMINE EVOLUTION STAGES & EGG GROUP
   * -
   */
}
