import * as angular from 'angular';

import { Projeto } from '../../models/Projeto';
import { Tarefa } from '../../models/Tarefa';
import { Usuario } from '../../models/Usuario';
import { TarefaService } from '../../services/TarefaService';
import { UsuarioService } from '../../services/UsuarioService';

const peopleUsers: any[] = [];
const usuarioService = new UsuarioService();
usuarioService.listAllUsuarios().then((response) => {
    response.forEach(usuario => {
        peopleUsers.push({
            id: usuario.id,
            icon: usuario.imagemUrl,
            primaryText: usuario.nome,
            secondaryText: usuario.email,
            presence: 'offline',
            group: { name: 'Active Directory', order: 0 },
            color: 'blue'
        });
    });
});

export class TarefaEditController {
    public static $inject: string[] = ['$scope', '$state', '$stateParams', 'Styles'];

    private projeto: Projeto;
    private selectedPeopleUsers: any[];
    
    private descricao: string;
    private prazo: any;
    private andamento: number;
    private observacoes: string;

    constructor(
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private Styles: any
    ) {
        this.projeto = JSON.parse(this.$stateParams['projetoData']);
    }

    private addNewTarefa(): void {
        if (!this.selectedPeopleUsers || this.selectedPeopleUsers.length !== 1) {
            alert('Favor selecionar somente um usuário para responsável da tarefa.');
            return;
        }

        const tarefa = new Tarefa();
        const tarefaService = new TarefaService();

        tarefa.descricao = this.descricao;
        tarefa.prazo = this.prazo;
        tarefa.andamento = this.andamento;
        tarefa.observacoes = this.observacoes;
        tarefa.responsavel = new Usuario();
        tarefa.responsavel.id = this.selectedPeopleUsers[0].id;

        tarefaService.addTarefa(tarefa, this.projeto.id).then(() => {
            this.$state.go('tarefaList', {'projetoData': JSON.stringify(this.projeto)});
        });
    }

    private getPeoplePickerUsers(searchQuery: string): any[] {
        if (searchQuery) {
            let filteredUsers = peopleUsers.filter((item) => {
                return item.primaryText.toLowerCase().indexOf(searchQuery) !== -1;
            });
            return filteredUsers;
        }

        return peopleUsers;
    }    

    private voltar(): void {
        this.$state.go('projetoList');
    }
}