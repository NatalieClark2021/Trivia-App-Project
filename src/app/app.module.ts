import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GamePlayComponent } from './game-play/game-play.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSettingsComponent,
    GamePlayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
