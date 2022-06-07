import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { TriviaAPIService } from "src/shared/api/trivia-api.service";
import { APITriviaResponse } from "./../../shared/api/trivia-questions.model";
import { APIQuestion } from "./../../shared/api/trivia-questions.model";
import { SampleTriviaQuestions } from "./../../shared/api/trivia-questions.model";

@Injectable({
  providedIn: 'root'
})

export class TriviaQuestionDataService {
  // let's provide a Subject to subscribe to..
  newTriviaQuestionsAvailable = new Subject<APIQuestion[]>();
  private currentTriviaQuestions: APIQuestion[];
  private sampleTriviaQuestionData: APIQuestion[] = SampleTriviaQuestions;
  private apiReturnData: APITriviaResponse;


  // need to injust the API service to retrieve Trivia Questions from the API
  constructor(private triviaAPIService: TriviaAPIService) { }

  getTriviaQuestions(numQuestions: number, category: number, difficulty: string, questionType: string) {
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
          switch (this.apiReturnData.response_code) {
            case 1: {
              return throwError(() => Error("No Results - API doesn't have enough questions for your request."));
              break;
            }
            case 2: {
              return throwError(() => Error("Invalid Parameter - Request contains invalid parameter."));
              break;
            }
            case 3: {
              return throwError(() => Error("Toke not Found - Session does not exist."));
              break;
            }
            case 4: {
              return throwError(() => Error("Token Emply - Session Token has returned all possible questions for the request."));
              break;
              }
          }

        }

      }, error => {
        console.log('Error Retrieving Trivia Questions: ' + error);
      });
  }

 }
