/* this module will handle all the http requests to the
3rd party API service to get Trivia Questions
*/

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { APITriviaResponse } from "./trivia-questions.model";
import { catchError, throwError, map } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class TriviaAPIService {

  constructor(private http: HttpClient) { }

  getNewTriviaQuestions(numQuestions: number, category: number, difficulty: string, questionType: string) {
    // build out API parameters
    // there is a max and min for # questions
    let apiParams = new HttpParams();
    if (numQuestions > 50 || numQuestions < 1) {
      // use a default value for number of questions
      apiParams = apiParams.append('amount', 10);
    } else {
      apiParams = apiParams.append('amount', numQuestions);
    }
    // add a category if one is chosen
    if (category >= 9 && category <= 32 ) {
      //valid, so add it
      apiParams = apiParams.append('category', category);
    }
    // add a difficutly setting if one is chosen
    if (difficulty.length > 0) {
      //valid, so add it
      apiParams = apiParams.append('difficulty', difficulty);
    }
    // add a question type (T/F vs. Multi-choice) setting if one is chosen
    if (questionType.length > 0) {
      //valid, so add it
      apiParams = apiParams.append('type', questionType);
    }

    // call the API
    // console.log('environment.API_BASE_URL: ', environment.API_BASE_URL);
    // console.log('Params: ', apiParams);

    return this.http.get<APITriviaResponse>(environment.API_BASE_URL, {
      params: apiParams
    })
      .pipe(map((data: any) => {
      // will let the calling function handle data manipulation/translates
      // console.log("trivia data returned", data);
      return data;
    }),
      catchError((error) => {
        if (error.status == 404) {

        }
        console.log('Trivia API error', error);
        return throwError(() => Error('errorRecievingJSON ' ));
    }));


  }


}
