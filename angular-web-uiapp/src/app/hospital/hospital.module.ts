import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared';

import { HospitalRoutingModule } from './hospital-routing.module';
import { HomeComponent } from './home/home.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { SearchVendorsComponent } from './components/search-vendors/search-vendors.component';
import { ManageBidsComponent } from './components/manage-bids/manage-bids.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FactsheetsComponent } from './components/factsheets/factsheets.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerHubComponent } from './components/customer-hub/customer-hub.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HospitalService } from './components/hospital.service';



@NgModule({
  declarations: [
    HomeComponent, 
    SearchVendorsComponent, 
    VendorListComponent, 
    ManageBidsComponent, 
    QuotesComponent, 
    OrdersComponent, 
    FactsheetsComponent, DashboardComponent, CustomerHubComponent, ReportsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    SharedModule,

    HospitalRoutingModule,
    
    FormsModule
  ],
  providers: [HospitalService],
  exports: []
})
export class HospitalModule { }


