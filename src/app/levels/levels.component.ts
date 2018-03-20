import { Component, OnInit } from '@angular/core';
import { GameService } from '../core/game.service';
import { Level } from '../../assets/models/level';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {
  levels: Level[];
  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this._gameService.getLevels()
      .subscribe((data) => this.levels = data);
  }

}
