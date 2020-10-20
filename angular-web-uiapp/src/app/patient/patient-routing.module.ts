import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { CanActivateRouteGuard } from './can-activate.guard';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';



const routes: Routes = [

  {
    path: "patient",
    component: HomeComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "orders", component: OrdersComponent },
      { path: "**", redirectTo: '/patient/dashboard' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
