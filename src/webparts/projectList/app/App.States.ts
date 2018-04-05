import * as angular from 'angular';

angular
  .module('projectList')
  .config(uiRouterConfigurator);

uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider'];

function uiRouterConfigurator($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
  $stateProvider
    .state('projetoList', {
      template: require('./projetos/list.html'),
      params: {},
      controller: 'projetoListController',
      controllerAs: 'vm'
    })
    .state('projetoEdit', {
      template: require('./projetos/edit.html'),
      params: {},
      controller: 'projetoEditController',
      controllerAs: 'vm'
    })
    .state('tarefaList', {
      template: require('./tarefas/list.html'),
      params: {
        projetoData: undefined
      },
      controller: 'tarefaListController',
      controllerAs: 'vm'
    })
    .state('tarefaEdit', {
      template: require('./tarefas/edit.html'),
      params: {
        projetoData: undefined
      },
      controller: 'tarefaEditController',
      controllerAs: 'vm'
    });
}