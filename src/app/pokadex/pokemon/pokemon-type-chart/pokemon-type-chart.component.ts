import { Component, Input, OnInit } from '@angular/core';
import {
  NamedAPIResource,
  Pokemon,
  TypeRelations,
} from 'pokenode-ts';
import { PokemonService } from '../pokemon.service';

class TypeDamage {
  /* Name of the type */
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  /* Damage the type inflicts (2, 1/2, or 1) */
  private _damage: string;
  public get damage(): string {
    return this._damage;
  }
  public set damage(value: string) {
    this._damage = value;
  }
  constructor(n: string, d: string) {
    this.name = n;
    this.damage = d;
  }
}

@Component({
  selector: 'app-pokemon-type-chart',
  templateUrl: './pokemon-type-chart.component.html',
  styleUrls: ['./pokemon-type-chart.component.scss'],
})
export class PokemonTypeChartComponent implements OnInit {
  @Input('pokemon') pokemon: Pokemon;
  typesList: NamedAPIResource[];
  damageTaken: TypeDamage[] = [];
  typeOfPokemon: string[];
  relations: TypeRelations[] = [];

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.typesList = await this.pokemonService.listAllTypes();
    this.typeOfPokemon = this.pokemon.types.map((entry) => entry.type.name);
    // Gets the damage_relations for each type
    this.relations = await Promise.all(
      this.typeOfPokemon.map(
        async (type) =>
          await (
            await this.pokemonService.getType(type)
          ).damage_relations
      )
    );
    this.damageTaken = this.getDamageTaken(this.typesList);
  }

  getDamageTaken(typeList: NamedAPIResource[]) {
    const damageTaken: TypeDamage[] = typeList.map((typeEntry) => {
      // Iterate over each type
      let damage = '1';
      const typeOne = this.relations[0];
      const typeTwo = this.relations[1];
      const sameValue = (entry: NamedAPIResource) =>
        entry.name === typeEntry.name;

      // Conditions:
      const noDamageOne: boolean = typeOne.no_damage_from.some((entry) =>
        sameValue(entry)
      );
      const halfDamageOne: boolean = typeOne.half_damage_from.some((entry) =>
        sameValue(entry)
      );
      const doubleDamageOne: boolean = typeOne.double_damage_from.some(
        (entry) => sameValue(entry)
      );
      let noDamageTwo,
        halfDamageTwo,
        doubleDamageTwo: boolean = false;
      // check if there is another type on the pokemon
      if (typeTwo) {
        noDamageTwo = typeTwo.no_damage_from.some((entry) => sameValue(entry));
        halfDamageTwo = typeTwo.half_damage_from.some((entry) =>
          sameValue(entry)
        );
        doubleDamageTwo = typeTwo.double_damage_from.some((entry) =>
          sameValue(entry)
        );
      }

      // no_damage => 0
      if (noDamageOne || noDamageTwo) {
        damage = '0';
      }
      // double_damage + half_damage => 1
      else if (
        (doubleDamageOne && halfDamageTwo) ||
        (doubleDamageTwo && halfDamageOne)
      )
        damage = '1';
      else if (halfDamageOne || halfDamageTwo) {
        // half_damage + half_damage => 1/4
        if (halfDamageOne && halfDamageTwo) damage = '1/4';
        // half_damage => 1/2
        else damage = '1/2';
      } else if (doubleDamageOne || doubleDamageTwo) {
        // double_damage + double_damage => 4
        if (doubleDamageOne && doubleDamageTwo) damage = '4';
        // double_damage => 2
        else damage = '2';
      } else damage = '1';

      return new TypeDamage(typeEntry.name, damage);
    });
    return damageTaken;
  }
}
