import { Component, OnInit } from '@angular/core';
import { Generation, VersionGroup } from 'pokenode-ts';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  genList: Generation[];
  gameList: VersionGroup[];

  constructor(private gameService: GameService) {}

  async ngOnInit(): Promise<void> {
    // console.log(await this.gameService.getListOfGens());
  }
}
