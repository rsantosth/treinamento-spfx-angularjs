import * as angular from 'angular';

import { Projeto } from '../../models/Projeto';
import { ProjetoService } from '../../services/ProjetoService';

export class ListController {
    public static $inject: string[] = ['$scope', '$state', 'Styles'];

    private projetoListItems: Projeto[];
  
    constructor(
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private Styles: any
    ) {
        this.loadProjectList();
    }

    private loadProjectList(): void {
        const service = new ProjetoService();
        service.listAllProjetos().then((response) => {
            this.projetoListItems = response;
            this.$scope.$apply();
        });
    }

    private addNewProject(): void {
        this.$state.go('edit', {});
    }

    private getNameInitials(name: string): string {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }
}