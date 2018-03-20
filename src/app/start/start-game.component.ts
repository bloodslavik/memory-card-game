import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartComponent implements OnInit {
  title = 'Memory game';
  constructor() { }

  ngOnInit() {
  }

}
