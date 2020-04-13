import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdministradorComponent} from './components/administrador/administrador.component';
import {RecepcionComponent} from './components/recepcion/recepcion.component';
import { TecnicoComponent } from "./components/tecnico/tecnico.component";

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'Admin',
    component: AdministradorComponent
  },
  {
    path: 'Recepcion',
    component: RecepcionComponent
  },
  {
    path: 'Tecnico',
    component: TecnicoComponent
  },
  {
    path: 'not-found',
    component: LoginComponent
  },
  {
    path: 'courses',
    component: LoginComponent
  },
  {
    path: '**',
    component: LoginComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
