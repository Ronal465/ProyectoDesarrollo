
import {Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'; // Sirve Para hacer peticiones http
import {Observable} from 'rxjs';
import { InterfaceSolicitud } from "../models/InterfaceSolicitud";
import { InterfaceServicio } from "../models/InterfaceServicio";
import { InterfaceTrm } from "../models/InterfaceTrm";
/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  Apli_URL = 'http://localhost:3000/api';
  
  
  constructor(private http : HttpClient ) {}



  list() : Observable<any>{
     
    return this.http.get(`${this.Apli_URL}/solicitud`);
  } 

  GetOneSolicitud(StrId:string): Observable<any>{
    return this.http.get(`${this.Apli_URL}/solicitud/${StrId}`);
  }

  MaximoSolicitud(): Observable<any>{
    return this.http.get(`${this.Apli_URL}/solicitud/Numero/Id/`);
  }

  create(ObtInterfaceSolicitud : InterfaceSolicitud): Observable<any>{
    return this.http.post(`${this.Apli_URL}/solicitud`,ObtInterfaceSolicitud);
  }
  listEstado(): Observable<any>{
    return this.http.get(`${this.Apli_URL}/solicitud/Estados/Solicitud`);
  }
  createservicio(ObtInterfaceServicio : InterfaceServicio):Observable<any>{
    return this.http.post(`${this.Apli_URL}/servicio`,ObtInterfaceServicio);
  }
  createtrm(ObtInterfaceTrm : InterfaceTrm):Observable<any>{
    return this.http.post(`${this.Apli_URL}/trm`,ObtInterfaceTrm);
  }
  buscartrm(Valor : number):Observable<any>{
    return this.http.get(`${this.Apli_URL}/trm/${Valor}`,);
  }





}

