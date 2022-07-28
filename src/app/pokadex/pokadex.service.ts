import { Injectable } from '@angular/core';
import {
  Pokedexes,
  Pokemon,
  PokemonEntry,
  MainClient,
} from 'pokenode-ts';
const API_ROOT: string = 'https://pokeapi.co/api/v2';

@Injectable({ providedIn: 'root' })
export class PokadexService {
  numOfPokemons: number = 0;
  pokemons: Pokemon[];
  storedPokedex: boolean = false;
  api = new MainClient({
    cacheOptions: {
      maxAge: 20000,
      exclude: { query: false },
    },
  });

  constructor() {}

  get pokedex() {
    return this.pokemons.slice();
  }

  async listThemPokemons() {
    return await this.api.pokemon.listPokemons(0, 1000);
  }

  storePokedex() {
    this.storedPokedex = true;
  }

  async setPokedex() {
    this.pokemons = await this.getPokedex(Pokedexes.NATIONAL);
    this.storePokedex();
  }

  async getPokedex(pokedexID: any): Promise<Pokemon[]> {
    const ID_INDEX = 42;

    return await this.api.game
      .getPokedexById(pokedexID)
      .then(async (data) => {
        // Process Data Entries
        this.numOfPokemons = data.pokemon_entries.length;
        const entries: PokemonEntry[] = data.pokemon_entries;
        console.log(entries);

        return await Promise.all(
          entries.map(async (entry) => {
            // The ID of the pokemon is included in the URL
            const pokemonURL = entry.pokemon_species.url;
            const id = pokemonURL.substring(ID_INDEX, pokemonURL.length - 1);
            return await this.getPokemon(id);
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
}
