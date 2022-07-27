import { Component, Input, OnInit } from '@angular/core';
import { PokemonType } from 'pokenode-ts';

@Component({
  selector: 'app-type-badge',
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.scss']
})
export class TypeBadgeComponent implements OnInit {
  @Input('type') pType: PokemonType;

  constructor() { }

  ngOnInit(): void {
  }

}
