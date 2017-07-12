import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DatasetAddComponent} from './datasets/dataset-add/';
import {DatasetDeleteComponent} from './datasets/dataset-delete/';
import {ManagerComponent} from './manager/';
// import { VolumesEditComponent } from './volumes-edit/index';
import {VolumeDeleteComponent} from './volume-delete/index';
import {VolumesListComponent} from './volumes-list/';
import {ZvolAddComponent} from './zvol/zvol-add/';
import {ZvolDeleteComponent} from './zvol/zvol-delete/';
import {ZvolEditComponent} from './zvol/zvol-edit/';
import {VolumeImportListComponent} from './import-list/';

export const routes: Routes = [
  {path : '', component : VolumesListComponent},
  {path : 'id/:pk/dataset/add/:path', component : DatasetAddComponent},
  {path : 'id/:pk/zvol/add/:path', component : ZvolAddComponent},
  {path : 'id/:pk/zvol/edit/:path', component : ZvolEditComponent},
  {path : 'id/:pk/dataset/delete/:path', component : DatasetDeleteComponent},
  {path : 'id/:pk/zvol/delete/:path', component : ZvolDeleteComponent},
  {path : 'manager', component : ManagerComponent},
  {path : 'import_list', component: VolumeImportListComponent},
  //{ path: 'edit/:pk', component: VolumesEditComponent },
  {path : 'delete/:pk', component : VolumeDeleteComponent},
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
