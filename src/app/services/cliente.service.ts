import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InterfaceCliente } from "../models/InterfaceCliente";
import {Observable} from 'rxjs';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  Apli_URL = 'http://localhost:3000/api';


  constructor(private http:HttpClient) {

   }

   CrearCliente(ObtInterfaceCliente:InterfaceCliente):Observable<any> {

    return this.http.put(`${this.Apli_URL}/Cliente`,ObtInterfaceCliente);

   }

  getClientes() : Observable<any>{
     
    return this.http.get(`${this.Apli_URL}/Cliente/list`);
    
  } 

  getCliente(StrNumero_Identificacion:String)  : Observable<any>{

    return this.http.get(`${this.Apli_URL}/Cliente/${StrNumero_Identificacion}`);
  }

  update(StrId,ObtInterfaceCliente:InterfaceCliente){
    return this.http.post(`${this.Apli_URL}/Cliente/${StrId}`,ObtInterfaceCliente);
  }

}
