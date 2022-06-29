import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandEditorComponent } from './brand-editor/brand-editor.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';

import { CarDetailsComponent } from './car-details/car-details.component';
import { CarEditorComponent } from './car-editor/car-editor.component';
import { CarListComponent } from './car-list/car-list.component';

import { LocationListComponent } from './location-list/location-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './core/auth-guard';
import { RoleGuard } from './core/role-guard';

import { LocationEditorComponent } from './location-editor/location-editor.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'cars', component: CarListComponent, canActivate: [AuthGuard] },
  { path: 'cars/create', component: CarEditorComponent, canActivate: [RoleGuard] },
  { path: 'cars/edit/:id', component: CarEditorComponent, canActivate: [RoleGuard] },
  { path: 'cars/:carId', component: CarDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandListComponent, canActivate: [AuthGuard] },
  { path: 'brands/create', component: BrandEditorComponent, canActivate: [RoleGuard] },
  { path: 'brands/:brandId', component: BrandDetailsComponent, canActivate: [AuthGuard] },
  { path: 'locations', component: LocationListComponent },
  { path: 'locations/edit/:id', component: LocationEditorComponent, canActivate: [RoleGuard] },
  { path: 'locations/create', component: LocationEditorComponent, canActivate: [RoleGuard] },
  { path: 'models/create/:brandId', component: ModelEditorComponent, canActivate: [RoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
