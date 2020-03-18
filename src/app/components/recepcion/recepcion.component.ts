import {Component, OnInit} from '@angular/core';
import {InterfaceCliente} from "../../models/InterfaceCliente";
import {InterfaceMarca} from '../../models/InterfaceMarca';
import {InterfaceEquipo} from '../../models/InterfaceEquipo';
import {InterfaceModelo} from '../../models/InterfaceModelo';
import {InterfaceTipoEquipo} from '../../models/InterfaceTipoEquipo';
import {TipoIdentificacionService} from "../../services/tipo-identificacion.service";
import {MarcamodeloService} from "../../services/marcamodelo.service";
import {MarcaService} from "../../services/marca.service";
import { isNumber } from 'util';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

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

  private ObtEquipo : InterfaceEquipo ={
    IdEquipo                :0,
    Serie                   :"",
    Observaciones           :"",
    FK_IdTipoEquipo         :0,
    FK_Id_cliente           :0,
    FK_IdModelo             :0
  }

  private ListaClientes: InterfaceCliente[] =
  [{
    Id_cliente                :1,
    FK_Tipo_Identificacion    :1,
    Numero_Identificacion     :'11',
    primer_Nombre             :'Juan',
    segundo_Nombre            :'Carlos ', 
    primer_Apellido           :'Federico',
    segundo_Apellido          :'Polar',
    Telefono                  :'',
    direccion                 :''
  },{
    Id_cliente                :2,
    FK_Tipo_Identificacion    :1,
    Numero_Identificacion     :'1192472',
    primer_Nombre             :'Ronaldo',
    segundo_Nombre            :'Carlos', 
    primer_Apellido           :'Rodrigeuz',
    segundo_Apellido          :'Perez',
    Telefono                  :'a',
    direccion                 :'a'
  },{
    Id_cliente                :3,
    FK_Tipo_Identificacion    :1,
    Numero_Identificacion     :'b',
    primer_Nombre             :'Pedro',
    segundo_Nombre            :'Analla', 
    primer_Apellido           :'Camello',
    segundo_Apellido          :'UribePirobo',
    Telefono                  :'b',
    direccion                 :'b'
  }];

  private ListaMarcas : InterfaceMarca []=[
    {
      IdMarca: 0,
      Descripcion:"Sony"
  }];

  private ListaModelos : InterfaceModelo []=[
    ];



  BuscarCliente = "";
  BuscarMarca   = "";
  BuscarModelo  = "";


  constructor(private TipoIdentificacionService: TipoIdentificacionService,
              private MarcamodeloService : MarcamodeloService,
              private MarcaService : MarcaService) { }

  ngOnInit() {

    this.MarcaService.getListMarcas().subscribe(
      res=>{
        this.ListaMarcas = res;
      }
    )

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

  ActualizarModelos(e){
   
if(!(isNaN(e.target.value )|| e.target.value == "")){



    this.MarcamodeloService.GetModelos( parseInt(e.target.value)).subscribe(
      res=>{
        this.ListaModelos = res;
        this.BuscarModelo = "";
      },
      err=>{
        this.ListaModelos = [];
        this.BuscarModelo = "";
      }
    )
  }else{
    alert("Ingrese Bien La Marca");
    this.ListaModelos = [];
    this.BuscarModelo = "";
  }

}

}
