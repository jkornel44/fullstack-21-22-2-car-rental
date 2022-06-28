import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarEditorComponent } from './car-editor/car-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/auth-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandEditorComponent } from './brand-editor/brand-editor.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { ErrorComponent } from './error/error.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationEditorComponent } from './location-editor/location-editor.component';
import { LocationSummaryComponent } from './location-summary/location-summary.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    HeaderComponent,
    CarEditorComponent,
    SearchComponent,
    CarDetailsComponent,
    LoginComponent,
    DashboardComponent,
    BrandEditorComponent,
    BrandListComponent,
    ErrorComponent,
    BrandDetailsComponent,
    LocationListComponent,
    LocationEditorComponent,
    LocationSummaryComponent,
    ModelEditorComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
