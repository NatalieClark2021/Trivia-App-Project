import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
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



  // need to injust the API service to retrieve Trivia Questions from the API
  constructor() { }

  getTriviaQuestions(numQuestions: number, category: number, difficulty: string, questionType: string) {
    // will implement API service to revrieve the quesitons in the future
    // for now, we will return the Sample Data
    this.currentTriviaQuestions = this.sampleTriviaQuestionData;
    return this.currentTriviaQuestions.slice();
    this.newTriviaQuestionsAvailable.next(this.currentTriviaQuestions.slice());
  }

 }
