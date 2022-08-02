import { Component, Input, OnInit } from '@angular/core';
import { PokemonStat } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit {
  @Input('stats') stats: PokemonStat[]
  maxBaseStat = 180

  constructor() { }

  ngOnInit(): void {
  }

}
