import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StartComponent } from '../start/start-game.component';
import { HelperComponent } from '../helper/helper.component';
import { LevelsComponent } from '../levels/levels.component';
import { GameComponent } from '../game/game.component';
import { Error404Component } from '../error404/error404.component';
import { EndComponent } from '../end/end.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'helper', component: HelperComponent },
  { path: 'levels', component: LevelsComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'end/:result', component: EndComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: []
})
export class AppRoutingModule { }
