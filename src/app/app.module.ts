import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';

// **Material Components** //

import { MatButtonModule} from '@angular/material';

// **Components** //
import { AppComponent } from './app.component';
import { StartComponent } from './start/start-game.component';
import { Error404Component } from './error404/error404.component';
import {GameService} from './core/game.service';
import { GameComponent } from './game/game.component';
import { EndComponent } from './end/end.component';
import { HelperComponent } from './helper/helper.component';
import { LevelsComponent } from './levels/levels.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    Error404Component,
    GameComponent,
    EndComponent,
    HelperComponent,
    LevelsComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
