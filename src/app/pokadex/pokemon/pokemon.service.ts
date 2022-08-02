import { Injectable } from '@angular/core';
import { MainClient, Pokemon, PokemonSpecies } from 'pokenode-ts';

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
    return await this.api.pokemon
      .getPokemonById(id)
      .then((data) => {
        this._pokemon = data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  async getSpecies(name: string) {
    return await this.api.pokemon
      .getPokemonSpeciesByName(name)
      .then((data) => {
        this._species = data;
        return data;
      })
      .catch((error) => {
        return error;
      });
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
}
