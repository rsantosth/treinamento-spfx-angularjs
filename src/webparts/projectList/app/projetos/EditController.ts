import * as angular from 'angular';

import { Projeto } from '../../models/Projeto';
import { ProjetoService } from '../../services/ProjetoService';
import { Usuario } from '../../models/Usuario';
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

export class ProjetoEditController {
    public static $inject: string[] = ['$scope', '$state', 'Styles'];

    private projetoListItems: Projeto[];
    private nome: string;
    private descricao: string;
    private gestor: number;

    private selectedPeopleUsers: any[];
  
    constructor(
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private Styles: any
    ) {}

    private addNewProjeto(): void {
        if (!this.selectedPeopleUsers || this.selectedPeopleUsers.length !== 1) {
            alert('Favor selecionar somente um usuário para gestor do projeto.');
            return;
        }

        const projeto = new Projeto();
        const projetoService = new ProjetoService();

        projeto.titulo = this.nome;
        projeto.descricao = this.descricao;
        projeto.gestor = new Usuario();
        projeto.gestor.id = this.selectedPeopleUsers[0].id;

        projetoService.addProjeto(projeto).then(() => {
            this.$state.go('projetoList', {});
        });
    }

    private cancel(): void {
        this.$state.go('projetoList', {});
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
}