
import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

   getListTipoIdentificacion() : Observable<any>{
      
    return this.http.get(`${this.Apli_URL}/TipoIdentificacion/list`);
    
  } 
  
}

