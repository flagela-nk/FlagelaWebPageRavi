import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    OrdersComponent,
    NutritionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    SharedModule,

    PatientRoutingModule,
    
    FormsModule
  ]
})
export class PatientModule { }
