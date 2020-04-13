import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InterfaceEmpleado } from "../models/InterfaceEmpleado";
import { Observable } from 'rxjs';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  Apli_URL = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {

  }

  CrearToken(ObtInterfaceEmpleado: InterfaceEmpleado) {

  return  this.http.post(`${this.Apli_URL}/Login`, ObtInterfaceEmpleado);

  }
  logout() {
    localStorage.removeItem('token');
  }
  ValidarLogin() : Observable<any> {
    var Token = localStorage.getItem('token');
    return this.http.post(`${this.Apli_URL}/Verificar`,{token: Token});
    
      
  }


}


