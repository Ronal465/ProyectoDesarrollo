import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.sass']
})
export class RecepcionComponent implements OnInit {

  OpcionAdministrador = "Inicio";
  
  constructor() { }

  ngOnInit() {
  }

}
