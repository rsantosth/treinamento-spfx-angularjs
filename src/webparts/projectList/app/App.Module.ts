import * as angular from 'angular';
import 'angular-ui-router';

import styles from '../ProjectListWebPart.module.scss';

import { AppController } from './AppController';
import { ProjetoListController } from './projetos/ListController';
import { ProjetoEditController } from './projetos/EditController';
import { TarefaListController } from './tarefas/ListController';

angular
  .module('projectList', [
    'ui.router',
    'officeuifabric.core',
    'officeuifabric.components'
  ])
  .constant('Styles', styles)
  .controller('appController', AppController)
  .controller('projetoListController', ProjetoListController)
  .controller('projetoEditController', ProjetoEditController)
  .controller('tarefaListController', TarefaListController);

require('./App.States');