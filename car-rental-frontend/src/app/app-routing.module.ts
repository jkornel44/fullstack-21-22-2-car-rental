import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarEditorComponent } from './car-editor/car-editor.component';
import { CarListComponent } from './car-list/car-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/create', component: CarEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
