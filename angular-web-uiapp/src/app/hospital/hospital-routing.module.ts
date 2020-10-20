import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FactsheetsComponent } from './components/factsheets/factsheets.component';
import { SearchVendorsComponent } from './components/search-vendors/search-vendors.component';
import { ManageBidsComponent } from './components/manage-bids/manage-bids.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CanActivateRouteGuard } from './can-activate.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerHubComponent } from './components/customer-hub/customer-hub.component';
import { ReportsComponent } from './components/reports/reports.component';



const routes: Routes = [

  {
    path: "hospital",
    component: HomeComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "manage-bids", component: ManageBidsComponent },
      { path: "factsheets", component: FactsheetsComponent },
      { path: "customer-hub", component: CustomerHubComponent },
      { path: "reports", component: ReportsComponent },
      /*
      { path: "search-vendors", component: SearchVendorsComponent },
      { path: "quotes", component: QuotesComponent },
      { path: "orders", component: OrdersComponent },
      */
      { path: "**", redirectTo: '/hospital/dashboard' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
