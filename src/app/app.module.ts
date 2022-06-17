import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GamePlayComponent } from './game-play/game-play.component';

import { HttpClientModule } from '@angular/common/http';
import { NameFormComponent } from './game-settings/name-form/name-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameCardComponentComponent } from './game-play/game-card-component/game-card-component.component';
import { AppRoutingModule } from './app-routing.module';
import { ScoreBoardComponent } from './game-play/score-board/score-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './shared/spinner/loading-spinner/loading-spinner.component';
import { NgParticlesModule } from "ng-particles";

@NgModule({
  declarations: [
    AppComponent,
    GameSettingsComponent,
    GamePlayComponent,
    NameFormComponent,
    GameCardComponentComponent,
    ScoreBoardComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
