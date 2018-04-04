import * as angular from 'angular';

export class AppController {
  public static $inject: string[] = ['$rootScope', '$state'];

  constructor($rootScope: angular.IRootScopeService, private $state: angular.ui.IStateService) {
    this.$state.go('list', {});
  }
}