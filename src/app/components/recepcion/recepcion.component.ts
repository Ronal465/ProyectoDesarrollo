import { Component, OnInit } from '@angular/core';
import {InterfaceCliente} from "../../models/InterfaceCliente";
import {TipoIdentificacionService} from "../../services/tipo-identificacion.service";


@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.sass']
})
export class RecepcionComponent implements OnInit {

  OpcionAdministrador = "Inicio";
  
  private ObtCliente : InterfaceCliente = {
    Id_cliente                :null,
    FK_Tipo_Identificacion    :1,
    Numero_Identificacion     :'',
    primer_Nombre             :'',
    segundo_Nombre            :'', 
    primer_Apellido           :'',
    segundo_Apellido          :'',
    Telefono                  :'',
    direccion                 :''
  }


  constructor(private TipoIdentificacionService: TipoIdentificacionService) { }

  ngOnInit() {
  }

  MostrarCosa(cosa){
    console.log(cosa);
  }

  RellenarListas(IntOpcion: number) {
    if (IntOpcion == 1) {
      this.TipoIdentificacionService.getListTipoIdentificacion().subscribe(
        res => {

          var miSelect = document.getElementById("CMBTipoIdentificacion");

          // Creamos un objeto option
          res.forEach((element, index) => {

            var miOption = document.createElement("option");

            // Añadimos las propiedades value y label
            miOption.setAttribute("value", `${element.IdTipoIdentificacion}`);
            miOption.setAttribute("label", `${element.Nombre}`);
            // Añadimos el option al select
            miSelect.appendChild(miOption);
          });


        },
        err => {

        }
      )
    }

  }


}
