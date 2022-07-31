import {
  NamedAPIResource,
  PokemonAbility,
  PokemonMove,
  PokemonStat,
  PokemonType,
  VersionGameIndex,
} from 'pokenode-ts';

export class PokemonModel {
  id: number;
  name: string;
  // base_experience: number;
  // abilities: PokemonAbility[];
  // forms: NamedAPIResource[];
  // game_indices: VersionGameIndex[];
  // location_area_encounters: string;
  // moves: PokemonMove[];
  // species: NamedAPIResource;
  // stats: PokemonStat[];
  types: PokemonType[];
}
