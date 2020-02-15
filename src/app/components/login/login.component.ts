import { Component, OnInit } from '@angular/core';
import {EmpleadoService} from '../../services/empleado.service';
import { InterfaceEmpleado } from 'src/app/models/InterfaceEmpleado';
import {CorreoService} from  '../../services/correo.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers:[
      EmpleadoService
  ]
})
export class LoginComponent implements OnInit {

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
        FK_IdPermisos           :1,
        FK_IdEstadoEmpleado     :1
  };

private Correo ={
  Correo:''
}

private IntIntentosLogin:number = 0;
  

  private EmpleadoObtenido : InterfaceEmpleado;
  SeccionLogin : boolean = true;

  constructor(private empleadoService:EmpleadoService,private correoService:CorreoService ) { }

  ngOnInit() { 
  }
  Loguearse(){
  
    var vacio1 = false;
    var vacio2 = false;

    if( this.ObtEmpleado.Username == ''){
      let username = document.getElementsByName("TxtUsername");
       username[0].style.borderBottomColor = "red";
       vacio1 = true;
       
   }else{
       let username = document.getElementsByName("TxtUsername");
       username[0].style.borderBottomColor = "black";
       vacio1 = false;
   } 
   
   if (this.ObtEmpleado.Contrasena == '' ){
     
     let Contrasena = document.getElementsByName("TxtContrasena");
     Contrasena[0].style.borderBottomColor = "red";
     vacio2 = true;

   }else{

    vacio2 = false;
    let Contrasena = document.getElementsByName("TxtContrasena");
    Contrasena[0].style.borderBottomColor = "black";
      
   }

   if(!vacio1 && !vacio2){
    this.empleadoService.getEmpleado(this.ObtEmpleado.Username).subscribe(
      res =>{ 
        this.EmpleadoObtenido = res;
        this.empleadoService.EncriptarContraseña(this.ObtEmpleado.Contrasena).subscribe(
          res =>{
            var Stringcontrasena = {
              contrasena: ''
            };
            Stringcontrasena.contrasena = res;
            if(this.EmpleadoObtenido.Contrasena ==  Stringcontrasena.contrasena){
              
              if(this.EmpleadoObtenido.FK_IdEstadoEmpleado == 3){
                alert("Empleado Bloqueado Por favor Contactar con el administrador");
              }else if(this.EmpleadoObtenido.FK_IdEstadoEmpleado == 2){
                alert("Empleado Inactivo Por favor Contactar con el administrador");
              }else{
                alert("Login Correcto");
              }
            } else{
              this.IntIntentosLogin++;
              alert("Contraseña Incorrecta");
              if(this.IntIntentosLogin >= 3){
                alert("Bloqueado, demasiados intentos");
                this.BloquearUsuario();
              }

            } 
          },
          err =>{
            alert("Fallo en el sistema por favor intente de nuevo");
          }
        )
      },
      err =>{
        alert("El usuario no está registrado");
        this.EmpleadoObtenido = null;
      }
    )
    
     
    
  }
  }
  RecuperarContrasena(){

      var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var StrContrasenaNueva = "";
    for (var i=0; i < 10; i++){
            StrContrasenaNueva += characters.charAt(Math.floor(Math.random()*characters.length));       
    } 

    
    var ValidaEnBaseDeDatos = false;
    
    
      this.empleadoService.getEmpleados().subscribe(
        res =>{
          
          var Empleados =[res];

          Empleados.forEach((item,index,array)=>{
            if(item[index].Correo == this.Correo.Correo){
              
              this.EmpleadoObtenido = item[index];
              ValidaEnBaseDeDatos = true;
            }
          }
          )
          if(ValidaEnBaseDeDatos){
            this.correoService.EnviarCorreo(this.Correo.Correo,{StrContrasenaNueva}).subscribe(
              res =>{
             alert("El correo ha sido enviado, por favor revise !");
              
              console.log(this.EmpleadoObtenido);
                  
                  this.empleadoService.EncriptarContraseña(StrContrasenaNueva).subscribe(
                    res =>{
                      var contrasena = {
                        contrasena: ''
                      };
                       contrasena.contrasena = res;
                       console.log(StrContrasenaNueva);
                       console.log(contrasena.contrasena);
                      this.EmpleadoObtenido.Contrasena= contrasena.contrasena;

                      this.empleadoService.UpdateEmpleado(this.EmpleadoObtenido.Id_Empleado,this.EmpleadoObtenido).subscribe(
                        res =>{
                          
                        },
                        err =>{
                          
                        }
                      )

                    },
                    err =>{
                      alert("Error Al Encriptar");
                    }
                  )
                
              
            },
            err =>{
              alert("Error al Mandar Correo");
            })
          }else{
            alert("Correo no registrado, por favor intente de nuevo");
          }
          


        },
        err =>{
          alert("Error en el sistema intente de nuevo");
        }
        );
        
        

  


      



  }
  BloquearUsuario(){
   
      this.EmpleadoObtenido.FK_IdEstadoEmpleado = 3;


      this.empleadoService.BloquearEmpleado(this.EmpleadoObtenido.Id_Empleado,this.EmpleadoObtenido).subscribe(
        res =>{
          
        },
        err =>{
          
        }
      )

  }
  
  



}

