import { Injectable } from '@angular/core';
import { MainClient, NamedAPIResource, Pokemon, PokemonSpecies } from 'pokenode-ts';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  api = new MainClient();
  private _pokemon: Pokemon;
  private _species: PokemonSpecies;

  public get pokemon(): Pokemon {
    return this._pokemon;
  }
  public set pokemon(value: Pokemon) {
    this._pokemon = value;
  }

  public get species(): PokemonSpecies {
    return this._species;
  }
  public set species(value: PokemonSpecies) {
    this._species = value;
  }

  constructor() {}

  async getPokemon(id: number) {
    try {
      const data = await this.api.pokemon.getPokemonById(id);
      this.pokemon = data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSpecies(name: string) {
    try {
      const data = await this.api.pokemon.getPokemonSpeciesByName(name);
      this.species = data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getEvolveChain(id: number) {
    return await this.api.evolution
      .getEvolutionChainById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  async listAllTypes(): Promise<NamedAPIResource[]> {
    return await this.api.pokemon
      .listTypes()
      .then((data) => {
        return data.results.slice(0, 18);
      })
      .catch((error) => {
        return error;
      });
  }

  async getType(name: string) {
    try {
      return this.api.pokemon.getTypeByName(name);
    } catch (error) {
      throw error;
    }
  }
}
