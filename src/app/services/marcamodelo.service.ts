import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';
import {InterfaceModelo} from "../models/InterfaceModelo";
import {InterfaceMarca} from "../models/InterfaceMarca";

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class MarcamodeloService {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

  GetModelos(IntIdMarca:number): Observable<any>{
    return this.http.get(`${this.Apli_URL}/MarcaModelo/Modelos/${IntIdMarca}`);
  }

  CreateModelo(ObtInterfaceModelo:InterfaceModelo): Observable<any>{
    return this.http.put(`${this.Apli_URL}/MarcaModelo/Modelos/`,ObtInterfaceModelo);
  }

  CreateMarcaModelo(ObtInterfaceModelo:InterfaceModelo, ObtInterfaceMarca:InterfaceMarca){
    return this.http.put(`${this.Apli_URL}/MarcaModelo/`,{ObtInterfaceModelo,ObtInterfaceMarca});
  }
  
}
