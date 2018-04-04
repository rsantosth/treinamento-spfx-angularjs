import { Version } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ProjectListWebPart.module.scss';
import * as strings from 'ProjectListWebPartStrings';

import * as angular from 'angular';
import './app/app.module';
import 'ng-office-ui-fabric';

import { ProjetoService } from './services/ProjetoService';
import { Projeto } from './models/Projeto';

export interface IProjectListWebPartProps {
  description: string;
}

export default class ProjectListWebPart extends BaseClientSideWebPart<IProjectListWebPartProps> {
  private $injector: ng.auto.IInjectorService;

  public constructor() {
    super();
    SPComponentLoader.loadCss('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');

    SPComponentLoader.loadScript('https://code.jquery.com/jquery-2.2.4.js', { globalExportsName: 'jQuery' }).then((jQuery: any): void => {
      SPComponentLoader.loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',  { globalExportsName: 'jQuery' }).then((): void => {
      });
    });     
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
        <div class="${ styles.projectList }" ng-controller="appController as vm">
          <div ui-view></div>
        </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['projectList']);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
