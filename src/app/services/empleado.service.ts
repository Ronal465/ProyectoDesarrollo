import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {InterfaceEmpleado} from '../models/InterfaceEmpleado';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}

   getEmpleados() : Observable<any>{
     
    return this.http.get(`${this.Apli_URL}/empleado`);
  } 

   getEmpleado(StrUsername:string): Observable<any>{
    return this.http.get(`${this.Apli_URL}/empleado/${StrUsername}`);
  }

   CreateEmpleado(InterfaceEmpleadoEmpleado:InterfaceEmpleado): Observable<any>{
    return this.http.post(`${this.Apli_URL}/empleado/`,InterfaceEmpleadoEmpleado);
  }

   UpdateEmpleado(IntId:Number,InterfaceEmpleadoUpdateEmpleado:InterfaceEmpleado): Observable<any>{
    return this.http.put(`${this.Apli_URL}/empleado/${IntId}`,InterfaceEmpleadoUpdateEmpleado);
  }
   
   DeletEmpleado(IntId:Number): Observable<any>{
    return this.http.delete(`${this.Apli_URL}/empleado/${IntId}`);
  }

  EncriptarContraseña(StrPassword:String): Observable<any>{
    return this.http.get(`${this.Apli_URL}/empleado/password/${StrPassword}`);
    
  }

  BloquearEmpleado(IntId:Number,InterfaceEmpleadoUpdateEmpleado:InterfaceEmpleado):Observable<any>{
    return this.http.put(`${this.Apli_URL}/empleado/bloquear/${IntId}`,InterfaceEmpleadoUpdateEmpleado);
  }

  ListCorreos(){
    return this.http.get(`${this.Apli_URL}/empleado/correo/list`);
  }

}
