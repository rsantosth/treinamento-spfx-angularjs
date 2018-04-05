import * as angular from 'angular';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import { Projeto } from '../../models/Projeto';
import { ProjetoService } from '../../services/ProjetoService';
import { MockService } from '../../services/MockService';

export class ProjetoListController {
    public static $inject: string[] = ['$scope', '$state', 'Styles'];

    private projetoListItems: Projeto[];
    private loading: boolean = false;
  
    constructor(
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private Styles: any
    ) {
        this.loading = true;
        this.loadProjetoList();
    }

    private loadProjetoList(): void {
        if (Environment.type === EnvironmentType.Local) {
            const service = new MockService();
            service.getProjetosMock().then((response) => {
                this.projetoListItems = response;
                this.$scope.$apply();
                this.loading = false;
            });
        } else {
            const service = new ProjetoService();
            service.listAllProjetos().then((response) => {
                this.projetoListItems = response;
                this.$scope.$apply();
            });
        }
    }

    private addNewProjeto(): void {
        this.$state.go('projetoEdit', {});
    }

    private addNewTarefa(projeto: Projeto): void {
        this.$state.go('tarefaEdit', {'projetoData': JSON.stringify(projeto)});
    }

    private viewTarefaList(projeto: Projeto): void {
        this.$state.go('tarefaList', {'projetoData': JSON.stringify(projeto)});
    }

    private getNameInitials(name: string): string {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }
}