import { Component, Input, OnInit } from '@angular/core';
import { ChainLink, EvolutionChain } from 'pokenode-ts';
import { PokemonService } from '../pokemon.service';

class EvolutionTemplate {
  id: number;
  name: string;
  stage: number;
  details: { detailName: string; detailValue: string }[];
  constructor(
    id: number,
    n: string,
    s: number,
    d: { detailName: string; detailValue: string }[]
  ) {
    this.id = id;
    this.name = n;
    this.stage = s;
    this.details = d;
  }
}

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss'],
})
export class PokemonEvolutionComponent implements OnInit {
  @Input('pokeID') id: number;
  @Input('pokeName') name: string;
  chain: EvolutionChain;
  evolutions: EvolutionTemplate[];
  stageOneEvolutions: EvolutionTemplate[] = [];
  stageTwoEvolutions: EvolutionTemplate[] = [];
  stageThreeEvolutions: EvolutionTemplate[] = [];

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.chain = await this.pokemonService.getEvolveChain(this.id);
    console.log('Evolution Chain: ', this.chain);
    this.evolutions = this.getEvolutions(this.chain);
    console.table(this.evolutions);
    this.stageOneEvolutions = this.evolutions.filter(
      (pokemon) => pokemon.stage === 1
    );
    this.stageTwoEvolutions = this.evolutions.filter(
      (pokemon) => pokemon.stage === 2
    );
    this.stageThreeEvolutions = this.evolutions.filter(
      (pokemon) => pokemon.stage === 3
    );
  }

  getEvolutions(chain: EvolutionChain): EvolutionTemplate[] {
    const evolutionTemplate: EvolutionTemplate[] = [];
    let firstInChain: ChainLink = chain.chain;
    let evolutionStage = 1;
    const details: { detailName: string; detailValue: string }[] = [];
    const firstEvolution = new EvolutionTemplate(
      +firstInChain.species.url.substring(
        42,
        firstInChain.species.url.length - 1
      ),
      firstInChain.species.name,
      evolutionStage,
      details
    );
    evolutionTemplate.push(firstEvolution);

    // Multiple evolutions
    for (const evolution of firstInChain.evolves_to) {
      evolutionStage = 2;
      handleChainLink(evolution);
    }

    // Recursive Function to traverse object tree
    function handleChainLink(chainLink: ChainLink) {
      const evDetails: { detailName: string; detailValue: string }[] = [];
      // Find Evolution Details
      for (const details of chainLink.evolution_details) {
        // Gets all keys details
        const keys = Object.keys(details);
        // Only find which detail is not null
        keys.forEach((key, index) => {
          if (details[key] && key != 'trigger') {
            let valuePassed: string | number = '';
            // Removes _ and Title Casing from key
            const formattedKey = key
              .replace(/_/g, (s) => (s = ' '))
              .replace(/\w\S*/g, (s) =>
                s.replace(/^\w/g, (c) => c.toUpperCase())
              );

            if (details[key].name) {
              valuePassed = details[key].name;
            } else {
              if (key != 'gender') valuePassed = details[key];
              if (details[key] === 1) valuePassed = 'female';
              else if (details[key] === 2) valuePassed = 'male';
            }

            // Removes - and Title Casing from value
            const formattedValue = valuePassed
              .toString()
              .replace(/-/g, (s) => (s = ' '))
              .replace(/\w\S*/g, (s) =>
                s.replace(/^\w/g, (c) => c.toUpperCase())
              );

            evDetails.push({
              detailName: formattedKey,
              detailValue: formattedValue,
            });
          }
        });
      }

      const nextEvolution = new EvolutionTemplate(
        +chainLink.species.url.substring(42, chainLink.species.url.length - 1),
        chainLink.species.name,
        evolutionStage,
        evDetails
      );

      evolutionTemplate.push(nextEvolution);
      for (const evolution of chainLink.evolves_to) {
        evolutionStage = 3;
        handleChainLink(evolution);
      }
    }

    return evolutionTemplate;
  }
}
