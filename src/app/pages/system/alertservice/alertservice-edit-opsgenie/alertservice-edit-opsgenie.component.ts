import {
  ApplicationRef,
  Component,
  Injector,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {RestService, WebSocketService} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';

@Component({
  selector : 'app-alertservice-edit-opsgenie',
  template : `<entity-form [conf]="this"></entity-form>`
})
export class AlertServiceEditOpsgenieComponent {

  protected resource_name = 'system/consulalerts';
  protected route_success: string[] = [ 'system', 'alertservice'];
  protected isNew = false;
  protected isEntity = true;
  
  
  protected fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'consulalert_type',
      placeholder: 'consulalert_type',
      disabled: true
    },{
      type : 'input',
      name : 'cluster_name',
      placeholder: 'cluster_name',
      tooltip: 'Enter the name of the cluster.',
    },{
      type : 'input',
      name : 'api_key',
      placeholder: 'api_key',
      tooltip: 'Paste the API Key here. Refer to the\
      <a href="https://docs.opsgenie.com/v1.0/docs/api-integration" target="_blank"> OpsGenie documentation</a>\
      for more information about finding the API Key.',
    },
    {
      type : 'checkbox',
      name : 'enabled',
      placeholder : 'Enabled',
      tooltip: 'Check this box to enable the OpsGenie alert service.',
    },
  ];

  resourceTransformIncomingRestData(data:any): any {
    data.cluster_name = data.attributes.cluster_name;
    data.api_key = data.attributes.api_key;

    return data;
  };


  constructor(
      protected router: Router,
      protected route: ActivatedRoute,
      protected rest: RestService,
      protected ws: WebSocketService,
      protected _injector: Injector,
      protected _appRef: ApplicationRef
  ) {

  }

  afterInit(entityForm: any) {
  }
}
