
import {Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpClientModule}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosEmpleadoServices {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

   getListPermisosEmpleado() : Observable<any>{
      
    return this.http.get(`${this.Apli_URL}/PermisosEmpleado/list`);
    
  } 
  
}
