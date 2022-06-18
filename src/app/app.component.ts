import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaQuestionDataService } from './game-settings/trivia-question-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trivia-app';

  constructor(private triviaQuestionDataService: TriviaQuestionDataService,
              private router: Router) { }

  onNewGame() {
    // clear the existing questions and users
    this.triviaQuestionDataService.clearAllPlayers();
    this.triviaQuestionDataService.clearCurrentTriviaQuestions();
    // redirect the user to the home/landing page
    this.router.navigate(['../game-settings']);
  }
}
