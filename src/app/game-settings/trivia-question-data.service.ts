import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { TriviaAPIService } from "src/shared/api/trivia-api.service";
import { APITriviaResponse } from "./../../shared/api/trivia-questions.model";
import { APIQuestion } from "./../../shared/api/trivia-questions.model";
import { SampleTriviaQuestions } from "./../../shared/api/trivia-questions.model";
import { Player } from "src/shared/api/player.module";
import { Quote } from "@angular/compiler";

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
    // console.log(winnerScore);
    // console.log(winners);
    return winners;

  }

  clearCurrentTriviaQuestions() {
    // get rid of the current questions array
    this.currentTriviaQuestions = null;
  }

  getCurrentTriviaQuestions() {
    // if we have data, return it
    if (!!this.currentTriviaQuestions) {
      return this.currentTriviaQuestions.slice();
    } else {
      return null;
    }

  }

  private shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  private randomizeAnswers(someTriviaQuestions: APIQuestion[]) {
    // console.log('original API questions', someTriviaQuestions);
    // the purpose of this method is to randomize the answers for the questions
    someTriviaQuestions.forEach(question => {
      // Handle when question type is T/F_____________________
      if (question.type == 'boolean') {
        question.incorrect_answers = ["A) True", "B) False"];
        if (question.correct_answer == "True") {
          question.correct_answer = 'A) True';
        } else {
          question.correct_answer = 'B) False';
        }
      } // end of Boolean questions

      // Handle Multiple Choice Questions ___________________________
      if (question.type == 'multiple') {
        // create an array of letters to assign to choices
        const letters = ['A) ', 'B) ', 'C) ', 'D) '];
        // add the answer to the incorrect_answer array
        question.incorrect_answers.push(question.correct_answer);
        //randomize the array
        // console.log('incorrect answers-before', question.incorrect_answers);
        this.shuffleArray(question.incorrect_answers);
        // console.log('incorrect answers-after', question.incorrect_answers);
        //scroll through the new list of incorrect answers and assign ABCD
        question.incorrect_answers.forEach((answer, index) => {
          // console.log('question index', index,answer)
          if (answer === question.correct_answer) {
            // assign the same letter
            // console.log('found correct answer', answer);
            question.correct_answer = this.replaceHTMLCodeWithText(letters[index] + answer);
          }
          // assign a letter to each choice
          // console.log('letters index', letters[index], index);
          question.incorrect_answers[index] = this.replaceHTMLCodeWithText(letters[index].concat(answer));
        })
      } // end of Multiple Choice
      // console.log('incorrect answers-final', question.incorrect_answers);
      // finally, remove special HTML codes from the question
      // console.log('original question test', question.question);
      question.question = this.replaceHTMLCodeWithText(question.question);
      // console.log('final/no html question test', question.question);
    });



  }

  private replaceHTMLCodeWithText(inputString: string): string {
    // let's scope a return value
    let returnString: string = inputString;
    returnString = returnString.replace(new RegExp('&quot;', 'g'), '"');
    returnString = returnString.replace(new RegExp('&rsquo;', 'g'), '"');
    returnString = returnString.replace(new RegExp('@ldquo;', 'g'), '"');
    returnString = returnString.replace(new RegExp('&amp;', 'g'), '&');
    returnString = returnString.replace(new RegExp('&#039;', 'g'), "'");
    returnString = returnString.replace(new RegExp('&euml', 'g'), "Ë");
    returnString = returnString.replace(new RegExp('&eacute;', 'g'), "É");
    returnString = returnString.replace(new RegExp('&ouml;', 'g'), "Ö");
    returnString = returnString.replace(new RegExp('&prime;', 'g'), "′");
    returnString = returnString.replace(new RegExp('&Prime;', 'g'), "″");
    returnString = returnString.replace(new RegExp('&Aacute;', 'g'), "Á");
    returnString = returnString.replace(new RegExp('&aacute;', 'g'), "á");
    return returnString;
  }

  getNewTriviaQuestions(numQuestions: number, category: number, difficulty: string, questionType: string) {
    this.triviaAPIService.getNewTriviaQuestions(numQuestions, category, difficulty, questionType)
      .subscribe(responseData => {
        // transfor the return data to the proper structure for the application
        this.apiReturnData = responseData;
        if (this.apiReturnData.response_code === 0) {
          // 0 =
          this.currentTriviaQuestions = this.apiReturnData.results;
          // console.log('original API questions', this.currentTriviaQuestions);
          this.randomizeAnswers(this.currentTriviaQuestions);
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
