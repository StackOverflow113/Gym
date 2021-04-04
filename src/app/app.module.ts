import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ListadoClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)


  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
