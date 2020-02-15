import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdministradorComponent} from './components/administrador/administrador.component';
import {RecepcionComponent} from './components/recepcion/recepcion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/Recepcion',
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
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
