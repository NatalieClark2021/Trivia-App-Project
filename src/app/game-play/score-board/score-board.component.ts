import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_CONFIGURATION } from '@angular/router';
import { TriviaQuestionDataService } from 'src/app/game-settings/trivia-question-data.service';
import { Player } from 'src/shared/api/player.module';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  players: Player[] =[
    // {name: 'Roger',
    // score: 2},
    // {name: 'Roger2',
    // score: 2},
    // {name: 'Roger3',
    // score: 2}
  ]

  constructor(private triviaQuestionDataService: TriviaQuestionDataService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.players = this.triviaQuestionDataService.getAllPlayers();
  }

  onChange(name:string, score: number){
    this.triviaQuestionDataService.updatePlayerScore(name,score);
  }


}
