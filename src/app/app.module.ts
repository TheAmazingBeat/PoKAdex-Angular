import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokadexComponent } from './pokadex/pokadex.component';
import { PokemonCardComponent } from './pokadex/pokemon-card/pokemon-card.component';
import { LeagueComponent } from './league/league.component';
import { LocationsComponent } from './locations/locations.component';
import { ItemsComponent } from './items/items.component';
import { MovesComponent } from './moves/moves.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { TypeBadgeComponent } from './pokadex/type-badge/type-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    PokadexComponent,
    PokemonCardComponent,
    LeagueComponent,
    LocationsComponent,
    ItemsComponent,
    MovesComponent,
    SidebarComponent,
    HeaderComponent,
    TypeBadgeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
