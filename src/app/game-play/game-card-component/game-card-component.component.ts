import { Component, Input, OnInit } from '@angular/core';
import { APIQuestion } from 'src/shared/api/trivia-questions.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TriviaQuestionDataService } from 'src/app/game-settings/trivia-question-data.service';

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
  flip: string = 'showFront';  //'showFront'
  questions: APIQuestion[] = [];
  currentQuestionIndex: number = 0;

  constructor(private triviaQuestionDataService: TriviaQuestionDataService) { }

  ngOnInit(): void {
    this.questions = this.triviaQuestionDataService.getCurrentTriviaQuestions();
  }

  onNextQuestion() {
    // remember the current index
    const tempQuestionIndex = this.currentQuestionIndex;
    //set the cur index to -1 so no question text appears
    this.currentQuestionIndex = -1;
    //rotate card back to the front
    this.onRotateCard()
    // wait 1 second for the card to flip, then move to next question
    setTimeout(() => {
      // increment the index of the current question if needed
      if (tempQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex = tempQuestionIndex + 1;
      }
    }, 500);
  }

  onShowWinner() {
    // get list of winners
    // do something spectacular
  }

  onRotateCard() {
    // console.log('flipping');
    this.flip = (this.flip == 'showFront') ? 'showBack' : 'showFront';
  }

}
