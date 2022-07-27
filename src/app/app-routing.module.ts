import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { LeagueComponent } from './league/league.component';
import { LocationsComponent } from './locations/locations.component';
import { MovesComponent } from './moves/moves.component';
import { PokadexComponent } from './pokadex/pokadex.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pokadex' },
  {
    path: 'pokadex',
    component: PokadexComponent,
    children: [
      {
        path: ':pageNumber',
        pathMatch: 'full',
        component: PokadexComponent,
      }
    ],
  },
  { path: 'locations', component: LocationsComponent },
  { path: 'league', component: LeagueComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'moves', component: MovesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
