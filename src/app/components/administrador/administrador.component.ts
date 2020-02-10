import { Component, OnInit } from '@angular/core';
import {InterfaceEmpleado} from '../../models/InterfaceEmpleado';
import {EstadoEmpleadoService} from '../../services/estado-empleado.service';
import {EmpleadoService} from '../../services/empleado.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.sass']
})
export class AdministradorComponent implements OnInit {

  private ObtEmpleado : InterfaceEmpleado = {
    Id_Empleado             :0,
    Primer_Nombre           :'',
    Segundo_Nombre          :'',
    Primer_Apellido         :'',
    Segundo_Apellido        :'',
    Correo                  :'',
    Direccion               :'',
    Telefono_Celular	      :'',
    Telefono_Fijo	          :'',
    Contrasena	            :'',
    Username		            :'',
    Permisos                :'1',
    FK_IdEstadoEmpleado     :1
};

  private ListaEmpleados : InterfaceEmpleado[]=
  [{
    Id_Empleado             :0,
    Primer_Nombre           :'',
    Segundo_Nombre          :'',
    Primer_Apellido         :'',
    Segundo_Apellido        :'',
    Correo                  :'',
    Direccion               :'',
    Telefono_Celular	      :'',
    Telefono_Fijo	          :'',
    Contrasena	            :'',
    Username		            :'',
    Permisos                :'1',
    FK_IdEstadoEmpleado     :1
}];

  BuscarEmpleado='';

  Numero="";

  OpcionAdministrador : string = "Inicio";

  constructor(private EstadoEmpleadoService:EstadoEmpleadoService,private EmpleadoService:EmpleadoService) { }

  

  ngOnInit() {
    this.EmpleadoService.getEmpleados().subscribe(
      res=>{
        this.ListaEmpleados = res;
      }
    )
  }

  MostrarEmpleado(){
    console.log(this.ObtEmpleado);
  }

  RellenarListas(IntOpcion:number){

      if(IntOpcion == 1){
        this.EstadoEmpleadoService.getListEmpleados().subscribe(
          res =>{
            
              var miSelect=document.getElementById("CMBEstadoEmpleado");
              
              // Creamos un objeto option
              res.forEach((element,index) => {
    
              var miOption=document.createElement("option");
              
              // Añadimos las propiedades value y label
              miOption.setAttribute("value",`${element.IdEstadoEmpleado}`);
              miOption.setAttribute("label",`${element.Descripción}`);
              // Añadimos el option al select
              miSelect.appendChild(miOption);
              });
              
            
          },
          err =>{
    
          }
        )
      }

  }

  Mostrar(cosa){
    console.log(cosa);
  }

}
