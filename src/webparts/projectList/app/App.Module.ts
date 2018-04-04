import * as angular from 'angular';
import 'angular-ui-router';

import styles from '../ProjectListWebPart.module.scss';

import { AppController } from './AppController';
import { ListController } from './list/ListController';

angular
  .module('projectList', [
    'ui.router',
    'officeuifabric.core',
    'officeuifabric.components'
  ])
  .constant('Styles', styles)
  .controller('appController', AppController)
  .controller('listController', ListController);

require('./App.States');