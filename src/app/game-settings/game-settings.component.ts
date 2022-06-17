import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Player } from './../../shared/api/player.module';
import { TriviaQuestionDataService } from './trivia-question-data.service';
import { APIQuestion } from 'src/shared/api/trivia-questions.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit, OnDestroy {
  gameSettingsForm: FormGroup;
  private triviaQuestionsAvail: Subscription;
  objTriviaQuestions: APIQuestion[];
  requestingQuestions: boolean = false;

  constructor(private triviaQuestionDataService: TriviaQuestionDataService,
              private router: Router) { }

  ngOnInit(): void {
    let numQuestions = '';
    let category = '';
    let difficulty = '';
    let questionType = '';
    let players = new FormArray([]);

      this.gameSettingsForm = new FormGroup({
      'numQuestions': new FormControl(numQuestions, Validators.required),
      'category': new FormControl(category),
      'difficulty': new FormControl(difficulty),
      'questionType': new FormControl(questionType),
      'players': players
      });

    // subscribe to the Trivia Game Question API Service so we know that we have questions
    this.triviaQuestionsAvail = this.triviaQuestionDataService.newTriviaQuestionsAvailable.subscribe(
      (newTriviaQuestions: APIQuestion[]) => {
        this.objTriviaQuestions = newTriviaQuestions;
        if (!!this.objTriviaQuestions) {
          // we have questions, proceed to game play
          this.requestingQuestions = false;
          // console.log('objTriviaQuestions:', this.objTriviaQuestions);
          // navigate to the Game Play route
          // this.router.navigate(['../'], {relativeTo: this.route});
          this.router.navigate(['../gameplay']);
        }

      }
    );
  }

  onStartGame() {
    this.requestingQuestions = true;
    // console.log(this.gameSettingsForm);
    // Get values from the form
    let numQuestions = +this.gameSettingsForm.value.numQuestions;
    let category = +this.gameSettingsForm.value.category;
    let difficulty = this.gameSettingsForm.value.difficulty;
    let questionType = this.gameSettingsForm.value.questionType;
    let players = this.gameSettingsForm.value.players;
    // add users to the data service
    this.triviaQuestionDataService.clearAllPlayers();
    for (let player of players) {
      this.triviaQuestionDataService.addPlayer(player.name);
    }
    // console.log("players[]", this.triviaQuestionDataService.getAllPlayers());


    // make a call to the service to get new questions / we/ve subscribe to get the data
    this.triviaQuestionDataService.getNewTriviaQuestions(numQuestions, category, difficulty, questionType);

  }


  onAddPlayer(){
   (<FormArray>this.gameSettingsForm.get('players')).push(
     new FormGroup({
       'name': new FormControl(null, Validators.required)
     })
    );

  }

  onDeletePlayer(index: number) {
    (<FormArray>this.gameSettingsForm.get('players')).removeAt(index);
  }

  get controls() { // a getter!
    return (<FormArray>this.gameSettingsForm.get('players')).controls;
  }

  ngOnDestroy(): void {
    //unsubscribe to the Trivia Data Service
    this.triviaQuestionsAvail.unsubscribe();
    // console.log('Destroying the Trivia Data Service Subscription');
  }
}
