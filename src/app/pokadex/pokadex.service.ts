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

  async getPokedex(start: number, end: number, pokedexID: any): Promise<Pokemon[]> {
    const api = new GameClient();
    // console.log(await api.getPokedexById(Pokedexes.HOENN));
    
    return await api
      .getPokedexById(pokedexID)
      .then(async (data) => {
        // Process Data Entries
        this.numOfPokemons = data.pokemon_entries.length;
        const entries: PokemonEntry[] = data.pokemon_entries.slice(start, end);
        return await Promise.all(
          entries.map(async (entry) => {
            const id = entry.pokemon_species.name;
            return await this.getPokemon(id);
          })
        );
      })
      .catch((error) => {
        return error;
      });
  }

  async getPokemon(id: string): Promise<Pokemon> {
    const api = new PokemonClient();
    return await api
      .getPokemonByName(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
}
