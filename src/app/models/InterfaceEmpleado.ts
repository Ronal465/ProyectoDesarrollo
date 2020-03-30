export interface InterfaceEmpleado{
/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/
    Id_Empleado         :number;
    Primer_Nombre       :string;
    Segundo_Nombre      :string;
    Primer_Apellido     :string;
    Segundo_Apellido    :string;
    Correo              :string;
    Direccion           :string;
    Telefono_Celular    :string;
    Telefono_Fijo	    :string;
    Contrasena	        :string;
    Username		    :string;
    FK_IdPermisos       :number;
    FK_IdEstadoEmpleado :number;
}