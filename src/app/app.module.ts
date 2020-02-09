import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoService } from './services/empleado.service';
import { HttpClient } from 'selenium-webdriver/http';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { AdministradorComponent } from './components/administrador/administrador.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    LoginComponent,
    RecepcionComponent,
    TecnicoComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmpleadoService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
