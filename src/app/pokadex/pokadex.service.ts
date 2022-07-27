import { Injectable } from '@angular/core';
import {
  GameClient,
  PokemonClient,
  Pokedexes,
  Pokemon,
  PokemonEntry,
} from 'pokenode-ts';
const API_ROOT: string = 'https://pokeapi.co/api/v2';

@Injectable({ providedIn: 'root' })
export class PokadexService {
  numOfPokemons: number = 0;

  constructor() {}

  async getPokedex(start: number, end: number): Promise<Pokemon[]> {
    const api = new GameClient();
    return await api
      .getPokedexById(Pokedexes.NATIONAL)
      .then(async (data) => {
        // Process Data Entries
        this.numOfPokemons = data.pokemon_entries.length;
        const entries: PokemonEntry[] = data.pokemon_entries.slice(start, end);
        return await Promise.all(
          entries.map(async (entry) => {
            const id = entry.entry_number;
            return await this.getPokemon(id);
          })
        );
      })
      .catch((error) => {
        return error;
      });
  }

  async getPokemon(id: number): Promise<Pokemon> {
    const api = new PokemonClient();
    return await api
      .getPokemonById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
}
