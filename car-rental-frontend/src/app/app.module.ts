import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarEditorComponent } from './car-editor/car-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { CarSummaryItemComponent } from './car-summary-item/car-summary-item.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    HeaderComponent,
    CarEditorComponent,
    SearchComponent,
    CarDetailsComponent,
    DatePickerComponent,
    CarSummaryItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
