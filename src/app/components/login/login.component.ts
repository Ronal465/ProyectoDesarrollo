import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { InterfaceEmpleado } from 'src/app/models/InterfaceEmpleado';
import { CorreoService } from '../../services/correo.service';
import { Router } from '@angular/router';
import { AuthServiceService } from "../../services/auth-service.service";


/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [
    EmpleadoService
  ]
})
export class LoginComponent implements OnInit {

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
    FK_IdPermisos: 0,
    FK_IdEstadoEmpleado: 1
  };

  private Correo = {
    Correo: ''
  }

  private IntIntentosLogin: number = 0;

  private ObtEmpleadoObtenido: InterfaceEmpleado;
  BoolSeccionLogin: boolean = true;

  constructor(private empleadoService: EmpleadoService, private correoService: CorreoService,
    private Router: Router, private AuthServiceService: AuthServiceService) { }

  ngOnInit() {
    this.AuthServiceService.logout();
  }
  Loguearse() {


    var BoolVacio1 = false;
    var BoolVacio2 = false;

    if (this.ObtEmpleado.Username == '') {
      let ListaUsername = document.getElementsByName("TxtUsername");
      ListaUsername[0].style.borderBottomColor = "red";
      BoolVacio1 = true;

    } else {
      let ListaUsername = document.getElementsByName("TxtUsername");
      ListaUsername[0].style.borderBottomColor = "black";
      BoolVacio1 = false;
    }

    if (this.ObtEmpleado.Contrasena == '') {

      let ListaContraseña = document.getElementsByName("TxtContrasena");
      ListaContraseña[0].style.borderBottomColor = "red";

      BoolVacio2 = true;

    } else {

      BoolVacio2 = false;
      let ListaContraseña = document.getElementsByName("TxtContrasena");
      ListaContraseña[0].style.borderBottomColor = "black";
      ListaContraseña[0].children

    }

    if (!BoolVacio1 && !BoolVacio2) {
      this.empleadoService.getEmpleado(this.ObtEmpleado.Username).subscribe(
        res => {
          this.ObtEmpleadoObtenido = res;
          this.empleadoService.EncriptarContraseña(this.ObtEmpleado.Contrasena).subscribe(
            res => {
              var StringContrasena = {
                contrasena: ''
              };
              StringContrasena.contrasena = res;
              if (this.ObtEmpleadoObtenido.Contrasena == StringContrasena.contrasena) {

                if (this.ObtEmpleadoObtenido.FK_IdEstadoEmpleado == 3) {
                  alert("Empleado Bloqueado Por favor Contactar con el administrador");
                } else if (this.ObtEmpleadoObtenido.FK_IdEstadoEmpleado == 2) {
                  alert("Empleado Inactivo Por favor Contactar con el administrador");
                } else {
                  if (this.ObtEmpleadoObtenido.FK_IdPermisos == 1) {

                    this.AuthServiceService.CrearToken(this.ObtEmpleadoObtenido).subscribe((res: any) => {
                      localStorage.setItem('token', res.token);
                      this.Router.navigateByUrl(`/Admin`);
                    })
                  } else if (this.ObtEmpleadoObtenido.FK_IdPermisos == 2) {
                    this.AuthServiceService.CrearToken(this.ObtEmpleadoObtenido).subscribe((res: any) => {
                      localStorage.setItem('token', res.token);
                      this.Router.navigateByUrl(`/Tecnico`);
                    })

                  } else if (this.ObtEmpleadoObtenido.FK_IdPermisos == 3) {
                    this.AuthServiceService.CrearToken(this.ObtEmpleadoObtenido).subscribe((res: any) => {
                      localStorage.setItem('token', res.token);
                      this.Router.navigateByUrl(`/Recepcion`);
                    })
                  }

                }
              } else {
                this.IntIntentosLogin++;
                alert("Contraseña Incorrecta");
                if (this.IntIntentosLogin >= 3) {
                  alert("Bloqueado, demasiados intentos");
                  this.BloquearUsuario();
                }

              }
            },
            err => {
              alert("Fallo en el sistema por favor intente de nuevo");
            }
          )
        },
        err => {
          alert("El usuario no está registrado");
          this.ObtEmpleadoObtenido = null;
        }
      )
    }
  }
  RecuperarContrasena() {

    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var StrContrasenaNueva = "";
    for (var i = 0; i < 10; i++) {
      StrContrasenaNueva += characters.charAt(Math.floor(Math.random() * characters.length));
    }


    var BoolValidaEnBaseDeDatos = false;


    this.empleadoService.getEmpleados().subscribe(
      res => {

        var ListaEmpleados = [res];

        ListaEmpleados.forEach((item, index, array) => {
          if (item[index].Correo == this.Correo.Correo) {

            this.ObtEmpleadoObtenido = item[index];
            BoolValidaEnBaseDeDatos = true;
          }
        }
        )
        if (BoolValidaEnBaseDeDatos) {
          this.correoService.EnviarCorreo(this.Correo.Correo, { StrContrasenaNueva }).subscribe(
            res => {
              alert("El correo ha sido enviado, por favor revise !");
              this.empleadoService.EncriptarContraseña(StrContrasenaNueva).subscribe(
                res => {
                  var contrasena = {
                    contrasena: ''
                  };
                  contrasena.contrasena = res;
                  this.ObtEmpleadoObtenido.Contrasena = contrasena.contrasena;

                  this.empleadoService.UpdateEmpleado(this.ObtEmpleadoObtenido.Id_Empleado, this.ObtEmpleadoObtenido).subscribe(
                    res => {

                    },
                    err => {

                    }
                  )

                },
                err => {
                  alert("Error Al Encriptar");
                }
              )


            },
            err => {
              alert("Error al Mandar Correo");
            })
        } else {
          alert("Correo no registrado, por favor intente de nuevo");
        }



      },
      err => {
        alert("Error en el sistema intente de nuevo");
      }
    );










  }
  BloquearUsuario() {

    this.ObtEmpleadoObtenido.FK_IdEstadoEmpleado = 3;


    this.empleadoService.BloquearEmpleado(this.ObtEmpleadoObtenido.Id_Empleado, this.ObtEmpleadoObtenido).subscribe(
      res => {

      },
      err => {

      }
    )

  }





}

