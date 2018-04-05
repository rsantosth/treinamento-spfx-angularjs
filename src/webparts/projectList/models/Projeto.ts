import { Usuario } from './Usuario';

export class Projeto {
    public id: number;
    public titulo: string;
    public descricao: string;
    public gestor: any;

    public static mapListItem(projetoItem: any, gestorItem: any): Projeto {
        return {
            id: projetoItem.ID,
            titulo: projetoItem.Title,
            descricao: projetoItem.Descricao,
            gestor: Usuario.mapListItem(gestorItem)
        } as Projeto;
    }
}