import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'pokenode-ts';
import { PokadexService } from '../pokadex.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon;
  id: string;
  pokemonImgPath: string;

  constructor(private route: ActivatedRoute, private pokadex: PokadexService) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.pokemon = await this.pokadex.getPokemon(this.id);
    this.pokemonImgPath = `/assets/images/pokemon/official-artwork/${this.pokemon.id}.png`;
  }
}
