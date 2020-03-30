import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';
import {InterfaceMarca} from "../models/InterfaceMarca";

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

   getListMarcas() : Observable<any>{
      
    return this.http.get(`${this.Apli_URL}/Marca/list`);
    
  } 


  CrearMarca(ObtInterfaceMarca : InterfaceMarca) : Observable<any>{
      
    return this.http.put(`${this.Apli_URL}/Marca/`,ObtInterfaceMarca);
    
  }

  
}
 