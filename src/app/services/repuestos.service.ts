import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';
import {InterfaceRepuesto} from "../models/InterfaceRepuesto";

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class RepuestosService {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

   getListRepuesto() : Observable<any>{
      
    return this.http.get(`${this.Apli_URL}/repuestos/list`);
    
  } 


  CrearRepuestos(ObtInterfaceRepuesto : InterfaceRepuesto) : Observable<any>{
      
    return this.http.put(`${this.Apli_URL}/repuestos/`,ObtInterfaceRepuesto);
    
  }

  
}
 
