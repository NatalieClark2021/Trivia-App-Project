import { Component, OnInit } from '@angular/core';
import { Player } from 'src/shared/api/player.module';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  players: Player[] =[
    {name:'roger',
    score:2},
    {name:'roger2',
    score:7},
    {name:'roger3',
    score:4},

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
