import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './view/display/display.component';
import { FormComponent } from './view/form/form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddressFormComponent } from './view/address-form/address-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavComponent } from './view/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    FormComponent,
    AddressFormComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
