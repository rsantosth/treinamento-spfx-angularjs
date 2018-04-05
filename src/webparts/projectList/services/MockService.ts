import { Projeto } from '../models/Projeto';
import { Usuario } from '../models/Usuario';

export class MockService {
    private _mockProjetos: Projeto[] = [
        {
            id: 100,
            titulo: "Projeto Nova Intranet",
            descricao: "Construção da nova intranet utilizando a versão 2016 do Sharepoint On-Premises",
            gestor: { id: 1, nome: "Marcos Paulo", email: "marcos.paulo@contoso.com" } as Usuario
        },
        {
            id: 101,
            titulo: "Migração Microserviços",
            descricao: "Projeto com a finalidade da migração de todos serviços legados para arquitetura de microserviços",
            gestor: { id: 4, nome: "Fernanda Santos", email: "fernanda.santos@contoso.com" } as Usuario
        }
    ];

    public getProjetosMock(): Promise<Projeto[]> {
        return new Promise<Projeto[]>((resolve) => {
            resolve(this._mockProjetos);
        });
    }
}