import { Usuario } from "./Usuario";
import * as moment from 'moment';

export class Tarefa {
    public id: number;
    public descricao: string;
    public prazo: string;
    public responsavel: Usuario;
    public andamento: number;
    public observacoes: string;
    public finalizada: boolean;

    public static mapListItem(tarefaItem: any, responsavelItem: any): Tarefa {
        return {
            id: tarefaItem.ID,
            descricao: tarefaItem.Title,
            prazo: moment(tarefaItem.Prazo).format('DD/MM/YYYY'),
            responsavel: Usuario.mapListItem(responsavelItem),
            andamento: (parseFloat(tarefaItem.Andamento) * 100),
            observacoes: tarefaItem.Observacoes,
            finalizada: tarefaItem.Finalizada
        } as Tarefa;
    }
}