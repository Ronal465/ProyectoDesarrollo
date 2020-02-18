import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoEmpleadoService {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

   getListEmpleados() : Observable<any>{
      
    return this.http.get(`${this.Apli_URL}/EstadoEmpleado/list`);
    
  } 
  
}
