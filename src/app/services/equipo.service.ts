import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InterfaceEquipo } from "../models/InterfaceEquipo";
import {Observable} from 'rxjs';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  Apli_URL = 'http://localhost:3000/api';


  constructor(private http:HttpClient) {

   }

   CrearEquipo(ObtInterfaceEquipo:InterfaceEquipo):Observable<any> {

    return this.http.put(`${this.Apli_URL}/Equipo`,ObtInterfaceEquipo);

   }

   getEquipos() : Observable<any>{
     
    return this.http.get(`${this.Apli_URL}/Equipo/list`);
    
  } 


}
