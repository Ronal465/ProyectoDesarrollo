import { Component, OnInit } from '@angular/core';
import { InterfaceRepuesto } from "../../models/InterfaceRepuesto";
import { RepuestosService } from "../../services/repuestos.service";
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/


@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.sass']
})
export class TecnicoComponent implements OnInit {

  OpcionTecnico = "Inicio";

  private ListRepuestosCreados: InterfaceRepuesto[] = [

  ]
  private RepuestoCreado: InterfaceRepuesto = {
    IdRepuestos: null,
    Descripcion: "",
    Referencia: "",
    Valor: null
  }


  TokenValidar:boolean = false;

  constructor(private RepuestosService: RepuestosService,
              private AuthServiceService : AuthServiceService,
              private Router : Router) { }

  ngOnInit() {
    this.AuthServiceService.ValidarLogin().subscribe(
      res=>{
        if(res.Validar == true){

          if(res.token.FK_IdPermisos == 3){
            this.TokenValidar = false;
          this.Router.navigateByUrl(`/Recepcion`);
          }else{
            this.TokenValidar = true;
          }
        }else{
          this.TokenValidar = false;
          this.Router.navigateByUrl(`/login`);
        }
      }
    )

  }

  CrearRepuesto() {

    var boolValidar1 = false;
    var boolValidar2 = false;
    var boolValidar3 = false;

    if (this.RepuestoCreado.Descripcion == "") {
      document.getElementsByName("TxtDescripcion")[0].style.borderColor = "red";
    var boolValidar3 = false;

    } else {
      document.getElementsByName("TxtDescripcion")[0].style.borderColor = "black";
    var boolValidar3 = true;

    }

    if (this.RepuestoCreado.Valor == null || isNaN(this.RepuestoCreado.Valor)) {
      document.getElementsByName("TxtValor")[0].style.borderColor = "red";
      boolValidar1 = false;
    } else {
      document.getElementsByName("TxtValor")[0].style.borderColor = "black";
      boolValidar1 = true;
    }

     if (this.RepuestoCreado.Referencia == "") {
      document.getElementsByName("TxtReferencia")[0].style.borderColor = "red";
      boolValidar2 = false;
    } else {
      var boolValidar = true;
     this.RepuestosService.getListRepuesto().subscribe(
        res => {
          res.forEach(element => {

            if (element.Referencia == this.RepuestoCreado.Referencia) {
              boolValidar = false;

            }
          }
          );
          if (boolValidar) {
            document.getElementsByName("TxtReferencia")[0].style.borderColor = "black";
            boolValidar2 = true;
          } else {
            document.getElementsByName("TxtReferencia")[0].style.borderColor = "red";
            boolValidar2 = false;
          }


          if (boolValidar3
          && boolValidar1 && boolValidar2) {
          var lista = document.getElementsByName("ListaRepuestos");
          lista[0].style.borderColor = "black";
          document.getElementsByName("TxtDescripcion")[0].style.borderColor = "black";
          document.getElementsByName("TxtReferencia")[0].style.borderColor = "black";
          document.getElementsByName("TxtValor")[0].style.borderColor = "black";
    
          this.ListRepuestosCreados.push(this.RepuestoCreado);
          this.RepuestoCreado = {
            IdRepuestos: null,
            Descripcion: "",
            Referencia: "",
            Valor: null,
          };
        } 

        }
      );


    }

    

  


  }

  EliminarUltimRepuestoCreado() {
    if (this.ListRepuestosCreados.length > 0) {
      this.ListRepuestosCreados.pop();
    } else {
      var lista = document.getElementsByName("ListaRepuestos");
      lista[0].style.borderColor = "red";
    }
  }

  ValidarNumero(Cadena): boolean {
    var Validar: boolean = false;


    for (var i = 0; i < Cadena.length; i++) {
      if (isNaN(Cadena.charAt(i))) {
        Validar = true;
      }
    }
    return Validar;
  }

  GuardarListaRepuestos() {

    if (this.ListRepuestosCreados.length > 0) {
      this.ListRepuestosCreados.forEach(element => {
        this.RepuestosService.CrearRepuestos(element).subscribe(
          res => {

          }
        )
      })
      alert("Repuestos Creados");
      this.ListRepuestosCreados = null;
      this.OpcionTecnico = "Inicio";

    } else {
      var lista = document.getElementsByName("ListaRepuestos");
      lista[0].style.borderColor = "red";
    }
  }





}
