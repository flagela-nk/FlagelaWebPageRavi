import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RestApiRoutingModule } from './rest-api-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';
import { HospitalComponent } from './components/hospital/hospital.component';
import { DefaultComponent } from './components/default/default.component';



@NgModule({
  declarations: [
    HomeComponent, 
    HospitalComponent, DefaultComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RestApiRoutingModule
  ]
})
export class RestApiModule { }
