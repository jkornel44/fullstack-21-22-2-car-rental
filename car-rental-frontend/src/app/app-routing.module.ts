import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandListComponent } from './brand-list/brand-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarEditorComponent } from './car-editor/car-editor.component';
import { BrandEditorComponent } from './brand-editor/brand-editor.component';
import { CarListComponent } from './car-list/car-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './core/auth-guard';
import { RoleGuard } from './core/role-guard';


const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'cars', component: CarListComponent, canActivate: [AuthGuard] },
  { path: 'cars/create', component: CarEditorComponent, canActivate: [RoleGuard] },
  { path: 'cars/:carId', component: CarDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandListComponent, canActivate: [RoleGuard] },
  { path: 'brands/create', component: BrandEditorComponent, canActivate: [RoleGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
