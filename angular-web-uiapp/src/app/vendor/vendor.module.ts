import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared';

import { HomeComponent } from './home/home.component';
import { ManageBidsComponent } from './components/manage-bids/manage-bids.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SearchHospitalsComponent } from './components/search-hospitals/search-hospitals.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { StaffComponent } from './components/staff/staff.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent, 
    ManageBidsComponent, 
    QuotesComponent, 
    OrdersComponent, 
    SearchHospitalsComponent, 
    ApplicationsComponent, DashboardComponent, StaffComponent, ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    VendorRoutingModule,
    
    FormsModule
  ]
})

export class VendorModule { }
