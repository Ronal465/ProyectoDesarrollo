import { Component, OnInit } from '@angular/core';
import { InterfaceEmpleado } from '../../models/InterfaceEmpleado';
import { EstadoEmpleadoService } from '../../services/estado-empleado.service';
import { EmpleadoService } from '../../services/empleado.service';
import { PermisosEmpleadoServices } from "../../services/permisos-empleado.service";
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';


/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.sass']
})
export class AdministradorComponent implements OnInit {

  private ObtEmpleado: InterfaceEmpleado = {
    Id_Empleado: 0,
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Correo: '',
    Direccion: '',
    Telefono_Celular: '',
    Telefono_Fijo: '',
    Contrasena: '',
    Username: '',
    FK_IdPermisos: 1,
    FK_IdEstadoEmpleado: 1
  };

  private ListaEmpleados: InterfaceEmpleado[] =
    [{
      Id_Empleado: 0,
      Primer_Nombre: '',
      Segundo_Nombre: '',
      Primer_Apellido: '',
      Segundo_Apellido: '',
      Correo: '',
      Direccion: '',
      Telefono_Celular: '',
      Telefono_Fijo: '',
      Contrasena: '',
      Username: '',
      FK_IdPermisos: 1,
      FK_IdEstadoEmpleado: 1
    }];

  BuscarEmpleado = '';

  ContraseñaAnterior = "";

  OpcionAdministrador: string = "Inicio";

  constructor(private EstadoEmpleadoService: EstadoEmpleadoService, private EmpleadoService: EmpleadoService,
    private PermisosEmpleadoServices: PermisosEmpleadoServices,
    private Router: Router) { }



  ngOnInit() {

  }

  ActualizarListEmpleados() {
    this.EmpleadoService.getEmpleados().subscribe(
      res => {
        this.ListaEmpleados = res;
      }
    )
  }
  RellenarListas(IntOpcion: number) {
    if (IntOpcion == 1) {
      this.EstadoEmpleadoService.getListEmpleados().subscribe(
        res => {

          var miSelect = document.getElementById("CMBEstadoEmpleado");

          // Creamos un objeto option
          res.forEach((element, index) => {

            var miOption = document.createElement("option");

            // Añadimos las propiedades value y label
            miOption.setAttribute("value", `${element.IdEstadoEmpleado}`);
            miOption.setAttribute("label", `${element.Descripción}`);
            // Añadimos el option al select
            miSelect.appendChild(miOption);
          });


        },
        err => {

        }
      )
    }
    else if (IntOpcion == 2) {
      this.PermisosEmpleadoServices.getListPermisosEmpleado().subscribe(
        res => {

          var miSelect = document.getElementById("CMBPermisos");

          // Creamos un objeto option
          res.forEach((element, index) => {

            var miOption = document.createElement("option");

            // Añadimos las propiedades value y label
            miOption.setAttribute("value", `${element.IdPermisosEmpleado}`);
            miOption.setAttribute("label", `${element.Permiso}`);
            // Añadimos el option al select
            miSelect.appendChild(miOption);
          });


        },
        err => {

        }
      )
    }

  }
  ActualizarEditar(IntIdentificaicon) {
    this.LimpiarObtUsuario();
    this.RellenarListas(2);
    this.RellenarListas(1);

    this.EmpleadoService.getEmpleado(IntIdentificaicon).subscribe(
      res => {

        this.ObtEmpleado = res;
        this.ContraseñaAnterior = this.ObtEmpleado.Contrasena;
        this.ObtEmpleado.Contrasena = '';

      },
      err => {

      }
    )



  }
  UpdateUsuario() {

    var Boolvacio1 = false;
    var Boolvacio2 = false;
    var Boolvacio3 = false;
    var Boolvacio5 = false;
    var Boolvacio6 = false;
    var Boolvacio7 = false;
    var Boolvacio8 = false;
    var Boolvacio9 = false;

    if (this.ObtEmpleado.Primer_Nombre == '' || this.ValidarCadenaString(this.ObtEmpleado.Primer_Nombre)) {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio1 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio1 = false;
    }
    if (this.ObtEmpleado.Primer_Apellido == '' || this.ValidarCadenaString(this.ObtEmpleado.Primer_Apellido)) {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio2 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio2 = false;
    }
    if (this.ObtEmpleado.Username == '' || this.ValidarNumero(this.ObtEmpleado.Username)) {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "red";
      Boolvacio3 = true;

    } else {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "black";
      Boolvacio3 = false;
    }
    if (this.ValidarCadenaString(this.ObtEmpleado.Segundo_Apellido)) {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio5 = true;

    } else {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio5 = false;
    }
    if (this.ValidarCadenaString(this.ObtEmpleado.Segundo_Nombre)) {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio6 = true;

    } else {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio6 = false;
    }
    if (!this.ValidarCorreo(this.ObtEmpleado.Correo)) {
      let username = document.getElementsByName("TxtCorreo");
      username[0].style.borderBottomColor = "red";
      Boolvacio7 = true;

    } else {
      let username = document.getElementsByName("TxtCorreo");
      username[0].style.borderBottomColor = "black";
      Boolvacio7 = false;
    }
    if (this.ValidarNumero(this.ObtEmpleado.Telefono_Celular)) {
      let username = document.getElementsByName("TxtTelefonoCelular");
      username[0].style.borderBottomColor = "red";
      Boolvacio8 = true;

    } else {
      let username = document.getElementsByName("TxtTelefonoCelular");
      username[0].style.borderBottomColor = "black";
      Boolvacio8 = false;
    }
    if (this.ValidarNumero(this.ObtEmpleado.Telefono_Fijo)) {
      let username = document.getElementsByName("TxtTelefonoFijo");
      username[0].style.borderBottomColor = "red";
      Boolvacio9 = true;

    } else {
      let username = document.getElementsByName("TxtTelefonoFijo");
      username[0].style.borderBottomColor = "black";
      Boolvacio9 = false;
    }

    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3
      && !Boolvacio5 && !Boolvacio6 && !Boolvacio7 && !Boolvacio8 && !Boolvacio9) {


      if (this.ObtEmpleado.Contrasena == '') {
        this.ObtEmpleado.Contrasena = this.ContraseñaAnterior;

        this.EmpleadoService.UpdateEmpleado(this.ObtEmpleado.Id_Empleado, this.ObtEmpleado).subscribe(
          res => {
            alert("Se Actualizo Con Exito");
            this.LimpiarObtUsuario();
            this.ActualizarListEmpleados();
            this.OpcionAdministrador = "ActualizarUsuario";        
          },
          err => {

          }
        )
      } else {
        if(this.ObtEmpleado.Contrasena.length < 6){
          let username = document.getElementsByName("TxtContrasena");
          username[0].style.borderBottomColor = "red";
        }else{

        

        this.EmpleadoService.EncriptarContraseña(this.ObtEmpleado.Contrasena).subscribe(
          res => {
            this.ObtEmpleado.Contrasena = res;
            this.EmpleadoService.UpdateEmpleado(this.ObtEmpleado.Id_Empleado, this.ObtEmpleado).subscribe(
              res => {
                alert("Se Actualizo Con Exito");
                this.LimpiarObtUsuario();
                this.ActualizarListEmpleados();
                this.OpcionAdministrador = "ActualizarUsuario";         
              },
              err => {
                alert("Hubo Un Error En El Sistema");
              }
            )

          },
          err => {

          }
        )
      }

      }
    }



  }
  CrearUsuario() {

    var Boolvacio1 = false;
    var Boolvacio2 = false;
    var Boolvacio3 = false;
    var Boolvacio4 = false;
    var Boolvacio5 = false;
    var Boolvacio6 = false;
    var Boolvacio7 = false;
    var Boolvacio8 = false;
    var Boolvacio9 = false;
    var ValidarIdentificacion = false;

    if (this.ObtEmpleado.Primer_Nombre == '' || this.ValidarCadenaString(this.ObtEmpleado.Primer_Nombre)) {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio1 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio1 = false;
    }
    if (this.ObtEmpleado.Primer_Apellido == '' || this.ValidarCadenaString(this.ObtEmpleado.Primer_Apellido)) {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio2 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio2 = false;
    }

    this.ListaEmpleados.forEach(element => {

      if (this.ObtEmpleado.Username == element.Username) {

        ValidarIdentificacion = true;
      }

    });

    if (this.ObtEmpleado.Username == '' || this.ValidarNumero(this.ObtEmpleado.Username) || ValidarIdentificacion) {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "red";
      Boolvacio3 = true;

    } else {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "black";
      Boolvacio3 = false;
    }
    if (this.ObtEmpleado.Contrasena == '') {
      let username = document.getElementsByName("TxtContrasena");
      username[0].style.borderBottomColor = "red";
      Boolvacio4 = true;

    } else {
      if (this.ObtEmpleado.Contrasena.length < 6) {
        let username = document.getElementsByName("TxtContrasena");
        username[0].style.borderBottomColor = "red";
        Boolvacio4 = true;
      } else {
        let username = document.getElementsByName("TxtContrasena");
        username[0].style.borderBottomColor = "black";
        Boolvacio4 = false;
      }

    }
    if (this.ValidarCadenaString(this.ObtEmpleado.Segundo_Apellido)) {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio5 = true;

    } else {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio5 = false;
    }
    if (this.ValidarCadenaString(this.ObtEmpleado.Segundo_Nombre)) {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio6 = true;

    } else {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio6 = false;
    }
    if (!this.ValidarCorreo(this.ObtEmpleado.Correo)) {
      let username = document.getElementsByName("TxtCorreo");
      username[0].style.borderBottomColor = "red";
      Boolvacio7 = true;

    } else {
      let username = document.getElementsByName("TxtCorreo");
      username[0].style.borderBottomColor = "black";
      Boolvacio7 = false;
    }
    if (this.ValidarNumero(this.ObtEmpleado.Telefono_Celular)) {
      let username = document.getElementsByName("TxtTelefonoCelular");
      username[0].style.borderBottomColor = "red";
      Boolvacio8 = true;

    } else {
      let username = document.getElementsByName("TxtTelefonoCelular");
      username[0].style.borderBottomColor = "black";
      Boolvacio8 = false;
    }
    if (this.ValidarNumero(this.ObtEmpleado.Telefono_Fijo)) {
      let username = document.getElementsByName("TxtTelefonoFijo");
      username[0].style.borderBottomColor = "red";
      Boolvacio9 = true;

    } else {
      let username = document.getElementsByName("TxtTelefonoFijo");
      username[0].style.borderBottomColor = "black";
      Boolvacio9 = false;
    }

    this.EmpleadoService.getEmpleados().subscribe(
      res => {
        this.ListaEmpleados = res;
      },
      err => {

      }
    )






    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3 && !Boolvacio4
      && !Boolvacio5 && !Boolvacio6 && !Boolvacio7 && !Boolvacio8 && !Boolvacio9) {

      this.ObtEmpleado.Id_Empleado = null;

      this.EmpleadoService.EncriptarContraseña(this.ObtEmpleado.Contrasena).subscribe(
        res => {

          this.ObtEmpleado.Contrasena = res;

          this.EmpleadoService.CreateEmpleado(this.ObtEmpleado).subscribe(
            res => {
              alert("El Empleado Ha Sido Creado Con Éxito");
              this.LimpiarObtUsuario();

            },
            err => {

            }

          )
        }
      )


    }
  }
  LimpiarObtUsuario() {
    this.ObtEmpleado = {
      Id_Empleado: 0,
      Primer_Nombre: '',
      Segundo_Nombre: '',
      Primer_Apellido: '',
      Segundo_Apellido: '',
      Correo: '',
      Direccion: '',
      Telefono_Celular: '',
      Telefono_Fijo: '',
      Contrasena: '',
      Username: '',
      FK_IdPermisos: 1,
      FK_IdEstadoEmpleado: 1
    }
  }
  Recepcionista() {
    this.Router.navigateByUrl(`/Recepcion`);
  }
  Tecnico() {
    this.Router.navigateByUrl(`/Tecnico`);
  }
  ValidarCadenaString(Cadena): boolean {
    var Validar: boolean = false;


    for (var i = 0; i < Cadena.length; i++) {
      if (!isNaN(Cadena.charAt(i))) {
        Validar = true;
      }
    }
    return Validar;
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
  ValidarCorreo(valor): boolean {

    if (valor == '') {
      return true;
    } else {
      var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(valor) ? true : false;
    }

  }
}
