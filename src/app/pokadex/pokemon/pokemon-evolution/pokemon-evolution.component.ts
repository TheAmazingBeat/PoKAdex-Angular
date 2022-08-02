import { Component, Input, OnInit } from '@angular/core';
import { EvolutionChain } from 'pokenode-ts';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss'],
})
export class PokemonEvolutionComponent implements OnInit {
  @Input('pokeID') id: number;
  @Input('pokeName') name: string;
  chain: EvolutionChain;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.chain = await this.pokemonService.getEvolveChain(this.id);
    console.log(this.chain)
  }
}
