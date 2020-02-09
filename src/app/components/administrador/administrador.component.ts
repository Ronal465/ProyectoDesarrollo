import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.sass']
})
export class AdministradorComponent implements OnInit {


  OpcionAdministrador : string = "Inicio";

  constructor() { }

  ngOnInit() {
  }

}
