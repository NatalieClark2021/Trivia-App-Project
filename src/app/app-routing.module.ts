import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GamePlayComponent } from "./game-play/game-play.component";
import { GameSettingsComponent } from "./game-settings/game-settings.component";
import { NameFormComponent } from "./game-settings/name-form/name-form.component";


const appRoutes: Routes = [
  {path: "", redirectTo: "/game-settings", pathMatch: "full"},
  {path: "game-settings", component: GameSettingsComponent},
  {path: 'nameform', component: NameFormComponent},
  {path: "gameplay", component: GamePlayComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
