import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  Apli_URL = 'http://localhost:3000/api';
  

  constructor(private http : HttpClient) { }


  EnviarCorreo(StrCorreo:string,StrContrasenaNueva): Observable<any>{
    return this.http.put(`${this.Apli_URL}/EnviarCorreo/${StrCorreo}`,StrContrasenaNueva);
  }
}
