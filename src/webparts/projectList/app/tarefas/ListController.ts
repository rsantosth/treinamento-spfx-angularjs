import * as angular from 'angular';
import { Projeto } from '../../models/Projeto';
import { TarefaService } from '../../services/TarefaService';
import { Tarefa } from '../..//models/Tarefa';

export class TarefaListController {
    public static $inject: string[] = ['$scope', '$state', '$stateParams', 'Styles'];

    private projeto: Projeto;
    private queryExecutada: boolean = false;
    private exibirFinalizadas: boolean = false;
    private tarefasListItems: Tarefa[] = [];

    constructor(
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private Styles: any
    ) {
        this.projeto = JSON.parse(this.$stateParams['projetoData']);
        this.loadTarefasList();
    }

    private loadTarefasList(): void {
        const service = new TarefaService();
        service.listTarefasByProjeto(this.projeto.id, false).then((response) => {
            this.queryExecutada = true;
            this.tarefasListItems = response.map((tarefa) => {
                (tarefa as any).showObservacoes = false;
                return tarefa;
            });
            this.$scope.$apply();
        });
    }

    private finalizarTarefa(tarefaId: number): void {
        const service = new TarefaService();
        service.finalizarTarefa(tarefaId).then(() => {
            this.loadTarefasList();
        });
    }

    private exibirObservacoes(item: any): void {
        item.showObservacoes = !item.showObservacoes;
    }

    private voltar(): void {
        this.$state.go('projetoList');
    }
}