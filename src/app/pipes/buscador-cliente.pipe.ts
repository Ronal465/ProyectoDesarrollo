import { Pipe, PipeTransform } from '@angular/core';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Pipe({
  name: 'buscadorCliente'
})
export class BuscadorClientePipe implements PipeTransform {

  transform(value: any, arg: any[]): any {

    const resultadoBusqueda = [];

    for (const Cliente of value) {
     
      
      if (Cliente.primer_Nombre.indexOf(arg) > -1 ||
       Cliente.segundo_Nombre.indexOf(arg) > -1 ||
       Cliente.primer_Apellido.indexOf(arg) > -1 ||
       Cliente.segundo_Apellido.indexOf(arg) > -1) {
        
        resultadoBusqueda.push(Cliente);
      }
    }

    return resultadoBusqueda;


  }

}
