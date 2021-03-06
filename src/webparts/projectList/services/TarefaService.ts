import { Tarefa } from '../models/Tarefa';
import pnp from 'sp-pnp-js';
import * as moment from 'moment';

import async = require("async");

export class TarefaService {

    public listTarefasByProjeto(projetoId: number, finalizadas: boolean): Promise<Tarefa[]> {
        return new Promise<Tarefa[]>((resolve, reject) => {
            pnp.sp.web.lists.getByTitle("Tarefas").items
            .filter(`ProjetoId eq ${projetoId}`)
            .get().then((listItems: any[]) => {
                let results: Tarefa[] = [];

                async.each(listItems, (item:any, callback:(err?:Error)=>void) => {
                    pnp.sp.web.getUserById(item.ResponsavelId).get()
                    .then((gestor) => {
                        results.push(Tarefa.mapListItem(item, gestor));
                        callback();
                    })
                    .catch((error) => {
                        callback(error);
                    });
                }, (err: Error) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });      
    }

    public addTarefa(tarefa: Tarefa, projetoId: number): Promise<void> {
        return new Promise<void>((resolve) => {
            pnp.sp.web.lists.getByTitle("Tarefas").items.add({
                Title: tarefa.descricao,
                Prazo: moment(tarefa.prazo).format('YYYY-MM-DD'),
                ResponsavelId: tarefa.responsavel.id,
                Andamento: tarefa.andamento / 100,
                Observacoes: tarefa.observacoes,
                ProjetoId: projetoId
            }).then(i => {
                console.log(i);
                resolve();
            });
        });
    }    

    public finalizarTarefa(tarefaId: number): Promise<void> {
        return new Promise<void>((resolve) => {
            pnp.sp.web.lists.getByTitle('Tarefas').items.getById(tarefaId).update({
                Andamento: 1,
                Finalizada: true
            }).then(i => {
                console.log(i);
                resolve();
            });
        });
    }
}