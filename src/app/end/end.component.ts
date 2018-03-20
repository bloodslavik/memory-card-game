import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {isNumber} from 'util';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  score: number;
  time: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const result = this.route.snapshot.paramMap.get('result').split('_');
    if (isNaN(this.score = +result[0]) || isNaN(this.time = +result[1])) {
      this.router.navigate(['404']);
    }
  } // **get score and time into url

  newGame() {
    this.router.navigate(['levels']);
  } // **retry game
}
