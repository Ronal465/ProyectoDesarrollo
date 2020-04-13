export interface InterfaceSolicitud{
    /* Autor:
       Ronaldo Carlos Rodriguez Perez
       Ultima Edicion Por:
       Ronaldo Carlos Rodriguez Perez
    */
   IdSolicitud          :number;
   FechaIngreso         :Date;
   Fk_Id_Empleado       :number;
   FK_Id_clientes       :number;
   FK_IDTrm             :number;
   FK_IdEstadoSolicitud :number;

    }