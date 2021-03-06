import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpClientModule}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable,throwError} from 'rxjs';

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
