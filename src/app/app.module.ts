import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoService } from './services/empleado.service';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { BuscadorPipe } from './pipes/buscador.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecepcionComponent,
    TecnicoComponent,
    AdministradorComponent,
    BuscadorPipe
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
