import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';

const routes: Routes = [
  {
    path: 'issue-list',
    component: CarListComponent,
  },
  {
    path: '**',
    redirectTo: 'issue-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
