import { Injectable } from '@angular/core';
import { Card } from '../../assets/models/card';
import { Level } from '../../assets/models/level';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GameService {
  constructor() {
  }

  private generateCards(): Card[] {
    const suit = ['C', 'D', 'H', 'S'];
    const rating = [0, 2, 3, 4, 5, 7, 6, 8, 9, 'A', 'J', 'K', 'Q'];
    const cards: Card[] = [];
    suit.forEach((elSuit) => {
      rating.forEach((elRating) => {
        cards.push(new Card(elRating + elSuit, 'assets/cardsImages/'));
      });
    });
    return cards;
  } // **lazy and short method for creates cards array)

  private createLevelArray(): Level[] {
    const levels = [
      { name: 'Легкий', id: 'low', url: 'assets/cardsImages/levelSix.png', column: 2, row: 5 },
      { name: 'Средний', id: 'medium', url: 'assets/cardsImages/levelValet.png', column: 3, row: 6 },
      { name: 'Тяжелый', id: 'hard', url: 'assets/cardsImages/levelAce.png', column: 4, row: 7 },
    ];
    return levels;
  } // **create levels array

  getData(): Observable<Card[]> {
    return of(this.generateCards());
  } // **sending generated cards

  getLevels(): Observable<Level[]> {  // **sending array of levels game
    return of(this.createLevelArray());
  } // **sending levels game
}

