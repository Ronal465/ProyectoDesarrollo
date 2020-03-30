import { Pipe, PipeTransform } from '@angular/core';

/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
   
      const resultadoBusqueda = [];
     
        for(const Empleado of value){
          if(Empleado.Username.indexOf(arg) > -1){
            resultadoBusqueda.push(Empleado);
          }
        }

      return resultadoBusqueda;


  }

}
