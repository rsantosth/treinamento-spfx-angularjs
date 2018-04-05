import * as angular from 'angular';

angular
  .module('projectList')
  .config(uiRouterConfigurator);

uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider'];

function uiRouterConfigurator($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
  $stateProvider
    .state('list', {
      template: require('./list/list.html'),
      params: {},
      controller: 'listController',
      controllerAs: 'vm'
    })
    .state('edit', {
      template: require('./edit/edit.html'),
      params: {},
      controller: 'editController',
      controllerAs: 'vm'
    });    
}