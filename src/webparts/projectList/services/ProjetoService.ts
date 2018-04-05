import { Projeto } from '../models/Projeto';
import pnp from 'sp-pnp-js';

import async = require("async");

export class ProjetoService {

    public listAllProjetos(): Promise<Projeto[]> {
        return new Promise<Projeto[]>((resolve, reject) => {
            pnp.sp.web.lists.getByTitle("Projetos").items.orderBy('Title').get().then((listItems: any[]) => {
                let results: Projeto[] = [];

                async.each(listItems, (item:any, callback:(err?:Error)=>void) => {
                    pnp.sp.web.getUserById(item.GestorId).get()
                    .then((gestor) => {
                        results.push(Projeto.mapListItem(item, gestor));
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

    public addProjeto(projeto: Projeto): Promise<void> {
        return new Promise<void>((resolve) => {
            pnp.sp.web.lists.getByTitle("Projetos").items.add({
                Title: projeto.titulo,
                Descricao: projeto.descricao,
                GestorId: projeto.gestor.id
            }).then(i => {
                console.log(i);
                resolve();
            });
        });
    }
}