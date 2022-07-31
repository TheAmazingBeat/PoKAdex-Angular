import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Generation, Pokedexes, VersionGroup } from 'pokenode-ts';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('gameSelect') gameSelect: ElementRef;
  gameOptions: any = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // TODO store previous selectedGame from previous sessions

    this.gameService.gameSelect.emit([1]);
    this.gameOptions = this.gameService.listOfGames;
  }

  ngAfterViewInit(): void {
    this.gameService.game = this.gameSelect.nativeElement.value
      .split(',')
      .map((s: string) => parseInt(s));
  }

  onGameChanged(value: string) {
    this.gameService.gameSelect.emit(value.split(',').map((s) => parseInt(s)));
  }
}
