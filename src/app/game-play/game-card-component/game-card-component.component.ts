import { Component, Input, OnInit } from '@angular/core';
import { APIQuestion } from 'src/shared/api/trivia-questions.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-game-card-component',
  templateUrl: './game-card-component.component.html',
  styleUrls: ['./game-card-component.component.css'],
   animations: [
    trigger('flipState', [
      state('showBack', style({
        transform: 'rotateY(179deg)'
      })),
      state('showFront', style({
        transform: 'rotateY(0)'
      })),
      transition('showBack => showFront', animate('500ms ease-out')),
      transition('showFront => showBack', animate('500ms ease-in'))
    ])
  ]
})
export class GameCardComponentComponent implements OnInit {
  // @Input() questionArray: APIQuestion;
  flip: string = 'showFront';

  constructor() { }

  ngOnInit(): void {
  }

  onRotateCard() {
    console.log('flipping');
    this.flip = (this.flip == 'showFront') ? 'showBack' : 'showFront';
  }

}
