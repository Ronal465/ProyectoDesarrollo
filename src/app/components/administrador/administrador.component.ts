import { Component, OnInit } from '@angular/core';
import { InterfaceEmpleado } from '../../models/InterfaceEmpleado';
import { EstadoEmpleadoService } from '../../services/estado-empleado.service';
import { EmpleadoService } from '../../services/empleado.service';
import { PermisosEmpleadoServices } from "../../services/permisos-empleado.service";

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
    private PermisosEmpleadoServices: PermisosEmpleadoServices) { }



  ngOnInit() {
    this.EmpleadoService.getEmpleados().subscribe(
      res => {
        this.ListaEmpleados = res;
      }
    )
  }

  MostrarEmpleado() {
    console.log(this.ObtEmpleado);
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
  Mostrar(cosa) {
    console.log(cosa);
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


    if (this.ObtEmpleado.Contrasena == '') {
      this.ObtEmpleado.Contrasena = this.ContraseñaAnterior;

      this.EmpleadoService.UpdateEmpleado(this.ObtEmpleado.Id_Empleado, this.ObtEmpleado).subscribe(
        res => {
          alert("Se Actualizo Con Exito");
        },
        err => {

        }
      )
    } else {

      this.EmpleadoService.EncriptarContraseña(this.ObtEmpleado.Contrasena).subscribe(
        res => {
          this.ObtEmpleado.Contrasena = res;
          this.EmpleadoService.UpdateEmpleado(this.ObtEmpleado.Id_Empleado, this.ObtEmpleado).subscribe(
            res => {
              alert("Se Actualizo Con Exito");
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
  CrearUsuario() {

    var vacio1 = false;
    var vacio2 = false;
    var vacio3 = false;
    var vacio4 = false;

    if (this.ObtEmpleado.Primer_Nombre == '') {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "red";
      vacio1 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "black";
      vacio1 = false;
    }

    if (this.ObtEmpleado.Primer_Apellido == '') {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "red";
      vacio2 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "black";
      vacio2 = false;
    }
    if (this.ObtEmpleado.Username == '') {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "red";
      vacio3 = true;

    } else {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "black";
      vacio3 = false;
    }

    if (this.ObtEmpleado.Contrasena == '') {
      let username = document.getElementsByName("TxtContrasena");
      username[0].style.borderBottomColor = "red";
      vacio4 = true;

    } else {
      let username = document.getElementsByName("TxtContrasena");
      username[0].style.borderBottomColor = "black";
      vacio4 = false;
    }


    if (!vacio1 && !vacio2 && !vacio3 && !vacio4) {
      this.ObtEmpleado.Id_Empleado = null;



      this.EmpleadoService.EncriptarContraseña(this.ObtEmpleado.Contrasena).subscribe(
        res => {

          this.ObtEmpleado.Contrasena = res;

          this.EmpleadoService.CreateEmpleado(this.ObtEmpleado).subscribe(
            res => {
              alert(res.message);
              this.ObtEmpleado.Contrasena = "";
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

}
