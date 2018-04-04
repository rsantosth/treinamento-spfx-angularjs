import * as angular from 'angular';

import { Projeto } from '../../models/Projeto';
import { ProjetoService } from '../../services/ProjetoService';

export class ListController {
    public static $inject: string[] = ['$rootScope', '$scope', 'Styles'];

    private projetoListItems: Projeto[];
  
    constructor(
        private $rootScope: any,
        private $scope: angular.IScope,
        private Styles: any
    ) {
        debugger;
        this.loadProjectList();
    }

    private loadProjectList(): void {
        const service = new ProjetoService();
        service.listAllProjetos().then((response) => {
            this.projetoListItems = response;
            this.$scope.$apply();
        });
    }

    private getNameInitials(name: string): string {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }
}