import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})
export class NameFormComponent implements OnInit {
  nameControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }
  onFormSubmit(formObj: NgForm){
    console.log("Form Submitted");
  }
}
