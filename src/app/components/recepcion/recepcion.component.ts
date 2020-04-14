import { Component, OnInit } from '@angular/core';
import { InterfaceCliente } from "../../models/InterfaceCliente";
import { InterfaceMarca } from '../../models/InterfaceMarca';
import { InterfaceEquipo } from '../../models/InterfaceEquipo';
import { InterfaceModelo } from '../../models/InterfaceModelo';
import { ClienteService } from "../../services/cliente.service";
import { TipoIdentificacionService } from "../../services/tipo-identificacion.service";
import { MarcamodeloService } from "../../services/marcamodelo.service";
import { MarcaService } from "../../services/marca.service";
import { EquipoService } from "../../services/equipo.service";
import { InterfaceSolicitud } from "../../models/InterfaceSolicitud";
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { InterfaceEmpleado } from "../../models/InterfaceEmpleado";
import { InterfaceEstadoSolicitud } from "../../models/InterfaceEstadoSolicitud";
import { SolicitudService } from "../../services/solicitud.service";
import { InterfaceServicio } from "../../models/InterfaceServicio";
import { InterfaceOpciones } from "../../models/InterfaceOpciones";
import { element } from 'protractor';
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

  private ObtCliente: InterfaceCliente = {
    Id_cliente: null,
    FK_Tipo_Identificacion: 1,
    Numero_Identificacion: '',
    primer_Nombre: '',
    segundo_Nombre: '',
    primer_Apellido: '',
    segundo_Apellido: '',
    Telefono: '',
    direccion: ''
  }
  private ObtEquipo: InterfaceEquipo = {
    IdEquipo: null,
    Serie: "",
    Observaciones: "",
    FK_IdTipoEquipo: 0,
    FK_Id_cliente: 0,
    Fk_IdMarca: 0,
    Dano_Reportado: "",
    FK_IdModelo: 0
  }
  private ListaClientes: InterfaceCliente[] =
    [{
      Id_cliente: 0,
      FK_Tipo_Identificacion: 1,
      Numero_Identificacion: '',
      primer_Nombre: '',
      segundo_Nombre: '',
      primer_Apellido: '',
      segundo_Apellido: '',
      Telefono: '',
      direccion: ''
    }];
  private ListaMarcas: InterfaceMarca[] = [
    {
      IdMarca: 0,
      Descripcion: ""
    }];
  private ListaModelos: InterfaceModelo[] = [
  ];
  private CreacionModelos: InterfaceModelo[] = [
  ];
  private ModeloCreado: InterfaceModelo =
    {
      IdModelo: 0,
      Descripcion: ""
    };
  private MarcaCreada: InterfaceMarca = {
    IdMarca: null,
    Descripcion: ""
  }
  private SolicitudCreada: InterfaceSolicitud = {
    IdSolicitud: 0,
    FechaIngreso: new Date,
    Fk_Id_Empleado: 0,
    FK_Id_clientes: 0,
    FK_IDTrm: 0,
    FK_IdEstadoSolicitud: 0
  }
  private ListaEquipoCliente: InterfaceEquipo[] = [
  ]
  private EmpleadoAplicacion: InterfaceEmpleado;

  private ListaEstadoSolicitud: InterfaceEstadoSolicitud[] = [
  ]

  private ListaServicios: InterfaceServicio[] = [
  ]

  private ListaComboOpciones :InterfaceOpciones[] =[];
  


  private IntNumeroModelosCreados = 0;
  private BuscarCliente = "";
  private BuscarMarca = "";
  private BuscarModelo = "";
  private BuscadorCliente = "";
  private CBTA;
  private CBPC;
  private CBPV;
  private FechaSolicitud = ""
  private TokenValidar: boolean = false;
  private Trm;

  constructor(private TipoIdentificacionService: TipoIdentificacionService,
    private MarcamodeloService: MarcamodeloService,
    private MarcaService: MarcaService,
    private ClienteService: ClienteService,
    private EquipoService: EquipoService,
    private AuthServiceService: AuthServiceService,
    private Router: Router,
    private SolicitudService: SolicitudService) { }

  ngOnInit() {


    this.AuthServiceService.ValidarLogin().subscribe(
      res => {
        if (res.Validar == true) {

          if (res.token.FK_IdPermisos == 2) {
            this.TokenValidar = false;
            this.Router.navigateByUrl(`/Tecnico`);
            this.EmpleadoAplicacion = res.token;
          } else {
            this.TokenValidar = true;
            this.EmpleadoAplicacion = res.token;
          }
        } else {
          this.TokenValidar = false;
          this.Router.navigateByUrl(`/login`);
        }
      }
    )
    this.ClienteService.getClientes().subscribe(
      res => {
        this.ListaClientes = res;
      }
    )

    this.MarcaService.getListMarcas().subscribe(
      res => {
        this.ListaMarcas = res;
      }
    )



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
    } else if (IntOpcion == 2) {
      this.ClienteService.getClientes().subscribe(
        res => {
          this.ListaClientes = res;
          console.log(this.ListaClientes);
        }
      )
    } else if (IntOpcion == 3) {
      var Fecha = new Date();
      this.SolicitudCreada.FechaIngreso = Fecha;
      this.FechaSolicitud = Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear();
      this.SolicitudService.MaximoSolicitud().subscribe(
        res => {
          this.SolicitudCreada.IdSolicitud = res.IdSolicitud;
        }
      )

    } else if (IntOpcion == 4) {
      this.SolicitudService.listEstado().subscribe(
        res => {
          this.ListaEstadoSolicitud = res;
          this.SolicitudCreada.FK_IdEstadoSolicitud = 1;
        }
      )
    }

  }
  ActualizarModelos(e) {

    if (!(isNaN(e.target.value) || e.target.value == "")) {



      this.MarcamodeloService.GetModelos(parseInt(e.target.value)).subscribe(
        res => {
          this.ListaModelos = res;
          this.BuscarModelo = "";
        },
        err => {
          this.ListaModelos = [];
          this.BuscarModelo = "";
        }
      )
    } else {
      alert("Ingrese Bien La Marca");
      this.ListaModelos = [];
      this.BuscarModelo = "";
    }

  }
  SeleccionarCheckBox(Numero) {

    if (Numero == 1) {
      this.CBPV = false;
      this.CBPC = false;
      if (!this.CBTA) {
        this.ObtEquipo.FK_IdTipoEquipo = 1;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }

    } else if (Numero == 2) {
      this.CBTA = false;
      this.CBPV = false;
      if (!this.CBPC) {
        this.ObtEquipo.FK_IdTipoEquipo = 2;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }
    } else if (Numero == 3) {
      this.CBTA = false;
      this.CBPC = false;
      if (!this.CBPV) {
        this.ObtEquipo.FK_IdTipoEquipo = 3;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }

    }

  }
  CrearModelo() {

    if (this.ModeloCreado.Descripcion != "") {
      var lista = document.getElementsByName("ListaModelos");
      lista[0].style.borderColor = "black";
      document.getElementsByName("TxtDescripcionModelo")[0].style.borderColor = "black";
      this.IntNumeroModelosCreados++;
      this.ModeloCreado.IdModelo = this.IntNumeroModelosCreados;
      this.CreacionModelos.push(this.ModeloCreado);
      this.ModeloCreado = {
        IdModelo: 0,
        Descripcion: ""
      };
    } else {
      document.getElementsByName("TxtDescripcionModelo")[0].style.borderColor = "red";
    }


  }
  EliminarUltimoModeloCreado() {
    if (this.CreacionModelos.length > 0) {
      this.CreacionModelos.pop();
      this.IntNumeroModelosCreados--;
    }
  }
  GuardarMarcaModelo() {

    if (this.CreacionModelos.length > 0) {

      this.MarcaService.CrearMarca(this.MarcaCreada).subscribe(
        res => {
          this.CreacionModelos.forEach(element => {
            element.IdModelo = null;
            this.MarcamodeloService.CreateModelo(element).subscribe(
              res => {
                this.MarcamodeloService.CreateMarcaModelo(element, this.MarcaCreada).subscribe(
                  res => {
                    this.MarcaService.getListMarcas().subscribe(
                      res => {
                        this.ListaMarcas = res;
                      }
                    )
                    this.OpcionAdministrador = "CrearRadio";
                  }
                )
              }
            )
            this.CreacionModelos = [];
          }
          )
          alert("Marcas Modelos Creados");
        }
      )






    } else {
      var lista = document.getElementsByName("ListaModelos");
      lista[0].style.borderColor = "red";
    }

  }
  CrearCliente() {
    var Boolvacio1 = false;
    var Boolvacio2 = false;
    var Boolvacio3 = false;
    var Boolvacio4 = false;
    var Boolvacio5 = false;
    var Boolvacio6 = false;
    var Boolvacio7 = false;
    var Boolvacio8 = false;
    var ValidarIdentificacion = false;

    if (this.ObtCliente.primer_Nombre == '' || this.ValidarCadenaString(this.ObtCliente.primer_Nombre)) {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio1 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio1 = false;
    }
    if (this.ObtCliente.primer_Apellido == '' || this.ValidarCadenaString(this.ObtCliente.primer_Apellido)) {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio2 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio2 = false;
    }

    this.ClienteService.getClientes().subscribe(
      res => {
        this.ListaClientes = res;
      }
    )
    this.ListaClientes.forEach(element => {

      if (this.ObtCliente.Numero_Identificacion == element.Numero_Identificacion) {
        ValidarIdentificacion = true;
      }
    })

    if (this.ObtCliente.Numero_Identificacion == '' || this.ValidarNumero(this.ObtCliente.Numero_Identificacion) || ValidarIdentificacion) {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "red";
      Boolvacio3 = true;

    } else {


      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "black";
      Boolvacio3 = false;
    }
    if (this.ObtCliente.direccion == '') {
      let username = document.getElementsByName("TxtDireccion");
      username[0].style.borderBottomColor = "red";
      Boolvacio8 = true;

    } else {
      let username = document.getElementsByName("TxtDireccion");
      username[0].style.borderBottomColor = "black";
      Boolvacio8 = false;
    }

    if (this.ValidarCadenaString(this.ObtCliente.segundo_Nombre)) {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio4 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio4 = false;
    }

    if (this.ValidarCadenaString(this.ObtCliente.segundo_Apellido)) {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio5 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio6 = false;
    }

    if (this.ValidarNumero(this.ObtCliente.Telefono)) {
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "red";
      Boolvacio7 = true;
    } else {
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "black";
      Boolvacio7 = false;
    }

    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3 && !Boolvacio4 &&
      !Boolvacio5 && !Boolvacio6 && !Boolvacio7 && !Boolvacio8) {

      this.ClienteService.CrearCliente(this.ObtCliente).subscribe(
        res => {
          alert(res.message);
          this.LimpiarObtCliente();
        },
        err => {
          alert("Error Al Crear El Usuario");
        }

      )


    }

  }
  CrearEquipo() {

    var Boolvacio1 = false;
    var Boolvacio2 = false;
    var Boolvacio3 = false;
    var Boolvacio4 = false;

    if (this.BuscarMarca == '') {

      let username = document.getElementsByName("TxtBuscarMarca");
      username[0].style.borderBottomColor = "red";
      Boolvacio2 = true;

    } else {
      var Existencia = false;
      this.ListaMarcas.forEach(element => {
        if (this.BuscarMarca == (element.IdMarca + "")) {
          Existencia = true;

        }
      })
      if (Existencia) {
        let username = document.getElementsByName("TxtBuscarMarca");
        username[0].style.borderBottomColor = "black";
        Boolvacio2 = false;
      } else {
        let username = document.getElementsByName("TxtBuscarMarca");
        username[0].style.borderBottomColor = "red";
        Boolvacio2 = true;

      }


    }
    if (this.BuscarCliente == '') {
      let username = document.getElementsByName("TxtBuscarCliente");
      username[0].style.borderBottomColor = "red";
      Boolvacio1 = true;

    } else {
      var Existencia = false;
      this.ListaClientes.forEach(element => {
        if (this.BuscarCliente == (element.Id_cliente + "")) {
          Existencia = true;

        }
      })
      if (Existencia) {
        let username = document.getElementsByName("TxtBuscarCliente");
        username[0].style.borderBottomColor = "black";
        Boolvacio1 = false;
      } else {
        let username = document.getElementsByName("TxtBuscarCliente");
        username[0].style.borderBottomColor = "red";
        Boolvacio1 = true;

      }
    }
    if (this.BuscarModelo == '') {
      let username = document.getElementsByName("TxtBuscarModelo");
      username[0].style.borderBottomColor = "red";
      Boolvacio3 = true;

    } else {
      var Existencia = false;
      this.ListaModelos.forEach(element => {
        if (this.BuscarModelo == (element.IdModelo + "")) {
          Existencia = true;

        }
      })
      if (Existencia) {
        let username = document.getElementsByName("TxtBuscarModelo");
        username[0].style.borderBottomColor = "black";
        Boolvacio3 = false;
      } else {
        let username = document.getElementsByName("TxtBuscarModelo");
        username[0].style.borderBottomColor = "red";
        Boolvacio3 = true;

      }
    }
    if (this.ObtEquipo.Serie == '') {
      let username = document.getElementsByName("TxtNumeroSerie");
      username[0].style.borderBottomColor = "red";
      Boolvacio4 = true;

    } else {
      let username = document.getElementsByName("TxtNumeroSerie");
      username[0].style.borderBottomColor = "black";
      Boolvacio4 = false;
    }
    if (this.ObtEquipo.FK_IdTipoEquipo == 0) {

      let chexbox = document.getElementsByName("LabTA");
      chexbox[0].style.color = "red";
      let chexbox1 = document.getElementsByName("LabPC");
      chexbox1[0].style.color = "red";
      let chexbox2 = document.getElementsByName("LabPV");
      chexbox2[0].style.color = "red";
    } else {
      let chexbox = document.getElementsByName("LabTA");
      chexbox[0].style.color = "black";
      let chexbox1 = document.getElementsByName("LabPC");
      chexbox1[0].style.color = "black";
      let chexbox2 = document.getElementsByName("LabPV");
      chexbox2[0].style.color = "black";
    }
    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3 && !Boolvacio4) {

      this.ObtEquipo.FK_IdModelo = parseInt(this.BuscarModelo);
      this.ObtEquipo.FK_Id_cliente = parseInt(this.BuscarCliente);
      this.ObtEquipo.Fk_IdMarca = parseInt(this.BuscarMarca);

      this.EquipoService.CrearEquipo(this.ObtEquipo).subscribe(
        res => {
          alert(res.message);
        },
        err => {
          alert("Error Al Crear El Equipo");
        }
      )

    }


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
  ActualizarCliente(identificacion) {
    this.LimpiarObtCliente();
    this.RellenarListas(1);
    this.ClienteService.getCliente(identificacion).subscribe(
      res => {
        this.ObtCliente = res;
      }
    )


  }
  LimpiarObtCliente() {
    this.ObtCliente = {
      Id_cliente: null,
      FK_Tipo_Identificacion: 1,
      Numero_Identificacion: '',
      primer_Nombre: '',
      segundo_Nombre: '',
      primer_Apellido: '',
      segundo_Apellido: '',
      Telefono: '',
      direccion: ''
    }
  }
  EditarCliente() {

    var Boolvacio1 = false;
    var Boolvacio2 = false;
    var Boolvacio3 = false;
    var Boolvacio4 = false;
    var Boolvacio5 = false;
    var Boolvacio6 = false;
    var Boolvacio7 = false;
    var Boolvacio8 = false;
    var ValidarIdentificacion = false;

    if (this.ObtCliente.primer_Nombre == '' || this.ValidarCadenaString(this.ObtCliente.primer_Nombre)) {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio1 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio1 = false;
    }
    if (this.ObtCliente.primer_Apellido == '' || this.ValidarCadenaString(this.ObtCliente.primer_Apellido)) {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio2 = true;

    } else {
      let username = document.getElementsByName("TxtPrimerApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio2 = false;
    }

    this.ClienteService.getClientes().subscribe(
      res => {
        this.ListaClientes = res;
      }
    )
    this.ListaClientes.forEach(element => {

      if (this.ObtCliente.Numero_Identificacion == element.Numero_Identificacion) {
        if (this.ObtCliente.Id_cliente == element.Id_cliente) {
          ValidarIdentificacion = false;
        } else {
          ValidarIdentificacion = true;
        }

      }
    })

    if (this.ObtCliente.Numero_Identificacion == '' || this.ValidarNumero(this.ObtCliente.Numero_Identificacion) || ValidarIdentificacion) {
      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "red";
      Boolvacio3 = true;

    } else {

      let username = document.getElementsByName("TxtIdentificacion");
      username[0].style.borderBottomColor = "black";
      Boolvacio3 = false;
    }
    if (this.ObtCliente.direccion == '') {
      let username = document.getElementsByName("TxtDireccion");
      username[0].style.borderBottomColor = "red";
      Boolvacio8 = true;

    } else {
      let username = document.getElementsByName("TxtDireccion");
      username[0].style.borderBottomColor = "black";
      Boolvacio8 = false;
    }

    if (this.ValidarCadenaString(this.ObtCliente.segundo_Nombre)) {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio4 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio4 = false;
    }

    if (this.ValidarCadenaString(this.ObtCliente.segundo_Apellido)) {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio5 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio6 = false;
    }

    if (this.ValidarNumero(this.ObtCliente.Telefono)) {
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "red";
      Boolvacio7 = true;
    } else {
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "black";
      Boolvacio7 = false;
    }

    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3 && !Boolvacio4 &&
      !Boolvacio5 && !Boolvacio6 && !Boolvacio7 && !Boolvacio8) {

      this.ClienteService.update(this.ObtCliente.Id_cliente, this.ObtCliente).subscribe(
        res => {
          alert("El Cliente Ah Sido Actualizado");
          this.OpcionAdministrador = "ActualizarCliente";
          this.RellenarListas(2);

        }
      )

    }


  }
  ActualizarEquipos(e) {

    if (!(isNaN(e.target.value) || e.target.value == "")) {

      this.EquipoService.getEquipo(e.target.value).subscribe(
        res => {
          if (res.length > 0) {
            this.ListaServicios =[];
            this.ListaEquipoCliente = res;
            var Tamaño = res.length;
            var Iterador = 0;
            while(Iterador <Tamaño){
            
              var ServicioN :InterfaceServicio={
                IdServicio: null,
                Fecha_Ingreso: new Date,
                Descripcion: "",
                Valor: null
                
              }

              var Opcion={
                Opcion1:false,
                Opcion2:false,
                Opcion3:false,
                Opcion4:false
              }

              this.ListaComboOpciones.push(Opcion);

              Iterador++;
              this.ListaServicios.push(ServicioN);
            }
            console.log(this.ListaServicios);
            console.log(this.ListaComboOpciones);
            
          } else {
            this.ListaEquipoCliente = [];
          }

        },
        err => {
          this.ListaEquipoCliente = [];
        }
      )

    } else {
      this.ListaEquipoCliente = [];
    }

  }

  CrearServicio(){

    // this.ListaServicios.forEach(element=>{
    //   this.SolicitudService.createservicio(element).subscribe(
    //     res=>{
    //   })
    // })

      this.SolicitudService.createtrm({    IDTrm: null,
        Fecha: this.ConvertirDateString(new Date),
        valor: this.Trm}).subscribe(
          res=>{
            this.SolicitudService.buscartrm(parseInt(this.Trm)).subscribe(
              res=>{
                this.SolicitudCreada.Fk_Id_Empleado = this.EmpleadoAplicacion.Id_Empleado;
                this.SolicitudCreada.FK_Id_clientes =parseInt(this.BuscarCliente);
                this.SolicitudCreada.FK_IDTrm = res.IDTrm;
                console.log(this.SolicitudCreada);
              }
            )
          }
        )

     

    // this.SolicitudCreada.FK_Id_clientes =parseInt(this.BuscarCliente);
    // console.log(this.SolicitudCreada);



  }

  ConvertirDateString(Date : Date): string{

    return Date.getFullYear() + "-" + (Date.getMonth()+1) + "-" +Date.getDate();
  }

  
}
