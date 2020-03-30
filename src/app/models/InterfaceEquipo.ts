export interface InterfaceEquipo{
/* Autor:
   Ronaldo Carlos Rodriguez Perez
   Ultima Edicion Por:
   Ronaldo Carlos Rodriguez Perez
*/
    IdEquipo                :number;
    Serie                   :string;
    Observaciones           :string;
    FK_IdTipoEquipo         :number;
    FK_Id_cliente           :number;
    Fk_IdMarca              :number;
    Dano_Reportado          :string;
    FK_IdModelo             :number;
   
}
