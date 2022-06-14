import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { TriviaAPIService } from "src/shared/api/trivia-api.service";
import { APITriviaResponse } from "./../../shared/api/trivia-questions.model";
import { APIQuestion } from "./../../shared/api/trivia-questions.model";
import { SampleTriviaQuestions } from "./../../shared/api/trivia-questions.model";
import { Player } from "src/shared/api/player.module";

@Injectable({
  providedIn: 'root'
})

export class TriviaQuestionDataService {
  // let's provide a Subject to subscribe to..
  newTriviaQuestionsAvailable = new Subject<APIQuestion[]>();
  private currentTriviaQuestions: APIQuestion[];
  private sampleTriviaQuestionData: APIQuestion[] = SampleTriviaQuestions;
  private apiReturnData: APITriviaResponse;
  private gamePlayers: Player[];  // to keep this game simple, I'm adding the player info to this service.


  // need to injust the API service to retrieve Trivia Questions from the API
  constructor(private triviaAPIService: TriviaAPIService) { }

  // Player methods
  addPlayer(name: string) {
    this.gamePlayers.push({name: name, score: 0});
  }

  getAllPlayers() {
    return this.gamePlayers.slice();
  }

  updatePlayerScore(playerName: string ,increment: number) {
    let playerIndex = this.gamePlayers.findIndex(obj => obj.name == playerName);
    this.gamePlayers[playerIndex].score += increment;
  }

  clearAllPlayers() {
    this.gamePlayers = [];
  }

  getWinner(){

    let winnerScore = this.gamePlayers.reduce((prev, current) => (+prev.score > +current.score) ? prev : current);
    let winners = this.gamePlayers.filter(player => player.score == winnerScore.score);
    console.log(winnerScore);
    console.log(winners);
    return winners;

  }

  getCurrentTriviaQuestions() {
    // if we have data, return it
    if (!!this.currentTriviaQuestions) {
      return this.currentTriviaQuestions.slice();
    } else {
      return null;
    }

  }

  getNewTriviaQuestions(numQuestions: number, category: number, difficulty: string, questionType: string) {
    this.triviaAPIService.getNewTriviaQuestions(numQuestions, category, difficulty, questionType)
      .subscribe(responseData => {
        // transfor the return data to the proper structure for the application
        this.apiReturnData = responseData;
        if (this.apiReturnData.response_code === 0) {
          // 0 =
          this.currentTriviaQuestions = this.apiReturnData.results;
          this.newTriviaQuestionsAvailable.next(this.currentTriviaQuestions.slice());
          // return this.currentTriviaQuestions.slice();

        } else {
          // some error occurred throw an error
          console.log('API Repsonse Code: ', this.apiReturnData.response_code);
          switch (this.apiReturnData.response_code) {
            case 1: {
              console.log("API Repsonse: No Results - API doesn't have enough questions for your request.");
              return throwError(() => Error("No Results - API doesn't have enough questions for your request."));
              break;
            }
            case 2: {
              console.log("API Repsonse: Invalid Parameter - Request contains invalid parameter.");
              return throwError(() => Error("Invalid Parameter - Request contains invalid parameter."));
              break;
            }
            case 3: {
              console.log("API Repsonse: Token not Found - Session does not exist.");
              return throwError(() => Error("Token not Found - Session does not exist."));
              break;
            }
            case 4: {
              console.log("API Repsonse: Token Emply - Session Token has returned all possible questions for the request.");
              return throwError(() => Error("Token Emply - Session Token has returned all possible questions for the request."));
              break;
              }
          }

        }

      }, error => {
        console.log('Error Retrieving Trivia Questions: ' , error);
      });
  }

 }
