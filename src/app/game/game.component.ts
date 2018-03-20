import { Component, OnInit } from '@angular/core';
import { GameService } from '../core/game.service';
import { Card } from '../../assets/models/card';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

const BACK_SIDE_CARD = 'assets/cardsImages/bakeSideCards.png';
const FOLDER_IMAGES = 'assets/cardsImages/';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  numberOfString: number;
  numberOfCardsInString: number;
  // **All the timers variable
  timerGame: any;
  timerBeforeGame: any;
  timerHideCard: any;
  timerStartGame: any;

  currentPoint: number;

  previousCard: Card;

  iteratorArray: number[];

  mainTimer = {
    title: 'Карты перевернутся через',
    count: undefined,
    click: false,
  };  // **Object, which contains fields for main timers

  allCard: Card[];  // **Arrays of the all cards
  gamingCards: Card[] = []; // **Arrays gaming card
  constructor(private _cardService: GameService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this._cardService.getData()
      .subscribe((data) => this.allCard = data); // **Get cards into the cardService
    this.startGame(); // **Begin our game
  }

  private defineLevelGame(level: string) {
    switch (level) {
      case 'low':
        this.numberOfString = 2;
        this.numberOfCardsInString = 5;

        break;
      case 'medium':
        this.numberOfString = 3;
        this.numberOfCardsInString = 6;
        break;
      case 'hard':
        this.numberOfString = 4;
        this.numberOfCardsInString = 7;
        break;
      default:
        this.router.navigate(['404']);
    }
  } // ** define number of row and column cards

  private hideGamingCards() {
    this.gamingCards.forEach((el) => el.url = BACK_SIDE_CARD);
  } // **hides all cards

  private countOfOpenPair() {
    const result = this.gamingCards.reduce((count, el) => {
      return (el.url !== BACK_SIDE_CARD) ? count + 1 : count;
    }, 0);
    return Math.floor(result / 2);
  } // **return count of opened pair

  private countOfHidePair() {
    const result = this.gamingCards.reduce((count, el) => {
      return (el.url === BACK_SIDE_CARD) ? count + 1 : count;
    }, 0);
    return (result / 2) === 0.5 ? 1 : Math.floor( result / 2);
  } // **return count of closed pair

  private finishedGame() {
    clearInterval(this.timerGame);
    this.router.navigate([`/end/${this.currentPoint}_${this.mainTimer.count}`]);
  } // **redirect to end page

  private createIteratorArray(n: number) {
    for (let i = 0; i < n; i++) {
      this.iteratorArray.push(i);
    }
  } // **creates array for displays any number of row cards

  private randomGenerateGamingCard(count: number) {
    let arr: number[] = [];
    while (arr.length < count / 2) {
      const random = Math.floor(Math.random() * (52 - 0) + 0);
      if (arr.indexOf(random) < 0) {
        arr.push(random);
      }
    }
    arr = arr.concat(arr);
    arr.sort(() => (Math.random() * 1 - 0.5));
    arr.forEach((el) =>  {
      this.gamingCards.push(new Card(this.allCard[el].name, FOLDER_IMAGES));
    });
  } // **creates gamingCards

  private startSetupTimer(time: number = 5000) {
    this.mainTimer.count = time / 1000;
    this.timerHideCard = setTimeout(() => this.hideGamingCards(), time + 1000);
    this.timerBeforeGame = setInterval(() => this.mainTimer.count--, 1000);
    this.timerStartGame = setTimeout(() => {
      clearInterval(this.timerBeforeGame);
      this.mainTimer.click = true;
      this.mainTimer.count = 0;
      this.timerGame = setInterval(() => this.mainTimer.count++, 1000);
      this.mainTimer.title = 'Прошло ';
    }, time + 1000);
  } // **configures options for many timers

  private zeroingVariable() {
    clearTimeout(this.timerHideCard);
    clearInterval(this.timerBeforeGame);
    clearTimeout(this.timerStartGame);
    clearInterval(this.timerGame);
    this.currentPoint = 0;
    this.mainTimer = {
      title: 'Карты перевернутся через',
      count: undefined,
      click: false,
    };
    this.previousCard = undefined;
    this.gamingCards = [];
    this.iteratorArray = [];
  } // **first setting all the variables

  checkCard(el: Card) {
    if (this.mainTimer.click) {
      if (!this.previousCard)  {  // ** First click
        this.previousCard = el;
        el.setUrl(FOLDER_IMAGES);
      } else {
        if ((el.name === this.previousCard.name) && !(el.pared || this.previousCard.pared) && (el !== this.previousCard)) {
          this.currentPoint += 42 * this.countOfHidePair();
          el.setUrl(FOLDER_IMAGES);
          el.setPaire();
          this.previousCard.setPaire();
          this.previousCard = undefined;
        } else {
          if (!this.previousCard.pared) {
            this.currentPoint -= 42 * this.countOfOpenPair();
            this.previousCard.resetUrl(FOLDER_IMAGES);
            this.previousCard = undefined;
          } else {
            this.currentPoint -= 42 * this.countOfOpenPair();
            this.previousCard = undefined;
          }
        }
      }
    }
    if (this.gamingCards.every((element) =>  {
        return element.pared;
      })) {
      this.finishedGame();
    }
  } // **works this user click

  startGame() {
    this.defineLevelGame(this.route.snapshot.paramMap.get('id'));
    this.zeroingVariable();
    this.randomGenerateGamingCard(this.numberOfCardsInString * this.numberOfString);
    this.createIteratorArray(this.numberOfString);
    this.startSetupTimer();
  } // **explain nothing

}
