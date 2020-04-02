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
  IntNumeroModelosCreados = 0;
  BuscarCliente = "";
  BuscarMarca = "";
  BuscarModelo = "";
  BuscadorCliente = "";
  CBTA;
  CBPC;
  CBPV;
  CBANT;


  constructor(private TipoIdentificacionService: TipoIdentificacionService,
    private MarcamodeloService: MarcamodeloService,
    private MarcaService: MarcaService,
    private ClienteService: ClienteService,
    private EquipoService: EquipoService) {}

  ngOnInit() {

    this.ClienteService.getClientes().subscribe(
      res => {
        this.ListaClientes = res;
        console.log(this.ListaClientes);
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
      this.CBANT = false;
      if (!this.CBTA) {
        this.ObtEquipo.FK_IdTipoEquipo = 1;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }

    } else if (Numero == 2) {
      this.CBTA = false;
      this.CBPV = false;
      this.CBANT = false;
      if (!this.CBPC) {
        this.ObtEquipo.FK_IdTipoEquipo = 2;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }
    } else if (Numero == 3) {
      this.CBTA = false;
      this.CBPC = false;
      this.CBANT = false;
      if (!this.CBPV) {
        this.ObtEquipo.FK_IdTipoEquipo = 3;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }
    } else if (Numero == 4) {
      this.CBTA = false;
      this.CBPV = false;
      this.CBPC = false;
      if (!this.CBANT) {
        this.ObtEquipo.FK_IdTipoEquipo = 4;
      } else {
        this.ObtEquipo.FK_IdTipoEquipo = 0;
      }
    }

  }
  CrearModelo() {

    if (this.ModeloCreado.Descripcion != "") {
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
                  }
                )
              }
            )
            this.CreacionModelos = null;
          }

          )
        }
      )






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
      res=>{
        this.ListaClientes = res;
      }
    )
    this.ListaClientes.forEach(element =>{
      
      if(this.ObtCliente.Numero_Identificacion == element.Numero_Identificacion){
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

    if(this.ValidarCadenaString(this.ObtCliente.segundo_Nombre)){
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio4 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio4 = false;
    }
    
    if(this.ValidarCadenaString(this.ObtCliente.segundo_Apellido)){
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio5 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio6 = false;
    }

    if(this.ValidarNumero(this.ObtCliente.Telefono)){
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "red";
      Boolvacio7 = true;
    } else {
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "black";
      Boolvacio7 = false;
    }

    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3 &&!Boolvacio4 &&
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
    if (this.BuscarCliente == '') {
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
      let chexbox3 = document.getElementsByName("LabANT");
      chexbox3[0].style.color = "red";
    } else {
      let chexbox = document.getElementsByName("LabTA");
      chexbox[0].style.color = "black";
      let chexbox1 = document.getElementsByName("LabPC");
      chexbox1[0].style.color = "black";
      let chexbox2 = document.getElementsByName("LabPV");
      chexbox2[0].style.color = "black";
      let chexbox3 = document.getElementsByName("LabANT");
      chexbox3[0].style.color = "black";
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
  ActualizarCliente(identificacion){
    this.LimpiarObtCliente();
    this.RellenarListas(1);
    this.ClienteService.getCliente(identificacion).subscribe(
      res=>{
        this.ObtCliente = res;
      }
    )


  }
  LimpiarObtCliente(){
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

  EditarCliente(){

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
      res=>{
        this.ListaClientes = res;
      }
    )
    this.ListaClientes.forEach(element =>{
      
      if(this.ObtCliente.Numero_Identificacion == element.Numero_Identificacion){
        if(this.ObtCliente.Id_cliente == element.Id_cliente){
          ValidarIdentificacion = false;
        }else{
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

    if(this.ValidarCadenaString(this.ObtCliente.segundo_Nombre)){
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "red";
      Boolvacio4 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoNombre");
      username[0].style.borderBottomColor = "black";
      Boolvacio4 = false;
    }
    
    if(this.ValidarCadenaString(this.ObtCliente.segundo_Apellido)){
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "red";
      Boolvacio5 = true;
    } else {
      let username = document.getElementsByName("TxtSegundoApellido");
      username[0].style.borderBottomColor = "black";
      Boolvacio6 = false;
    }

    if(this.ValidarNumero(this.ObtCliente.Telefono)){
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "red";
      Boolvacio7 = true;
    } else {
      let username = document.getElementsByName("TxtTelefono");
      username[0].style.borderBottomColor = "black";
      Boolvacio7 = false;
    }

    if (!Boolvacio1 && !Boolvacio2 && !Boolvacio3 &&!Boolvacio4 &&
        !Boolvacio5 && !Boolvacio6 && !Boolvacio7 && !Boolvacio8) {

          this.ClienteService.update(this.ObtCliente.Id_cliente,this.ObtCliente).subscribe(
            res=>{
              alert("El Cliente Ah Sido Actualizado");
              this.OpcionAdministrador = "ActualizarCliente";
              this.RellenarListas(2);
      
            }
          )

        }
    
    
  }


}
