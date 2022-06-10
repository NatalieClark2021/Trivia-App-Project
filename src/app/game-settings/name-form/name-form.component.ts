import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Player } from 'src/shared/api/player.module';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})
export class NameFormComponent implements OnInit {
  nameControl = new FormControl('');
  playerControl = new FormControl('');
  player: Player;
  constructor() { }

  ngOnInit(): void {
  }
  onFormSubmit(formObj: NgForm){
    console.log("Form Submitted");
  }
}
