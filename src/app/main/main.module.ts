import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import { CarFormComponent } from './components/dashboard/car-form/car-form.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzUploadModule} from "ng-zorro-antd/upload";

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    CarFormComponent
  ],
  exports: [
    HeaderComponent,
    DashboardComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzIconModule,
        NzModalModule,
        NzFormModule,
        FormsModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzUploadModule
    ]
})
export class MainModule { }
