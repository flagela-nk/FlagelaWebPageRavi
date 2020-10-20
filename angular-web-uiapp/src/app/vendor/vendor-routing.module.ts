import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchHospitalsComponent } from './components/search-hospitals/search-hospitals.component';
import { ManageBidsComponent } from './components/manage-bids/manage-bids.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CanActivateRouteGuard } from './can-activate.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { StaffComponent } from './components/staff/staff.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [

    {
        path: "vendor",
        component: HomeComponent,
        canActivate: [CanActivateRouteGuard],
        children: [
            { path: "search-hospitals", component: SearchHospitalsComponent },
            { path: "manage-bids", component: ManageBidsComponent },
            //{ path: "applications", component: ApplicationsComponent },
            //{ path: "quotes", component: QuotesComponent },
            //{ path: "orders", component: OrdersComponent },
            { path: "staff", component: StaffComponent },
            { path: "profile", component: ProfileComponent },
            { path: "dashboard", component: DashboardComponent },
            { path: "**", redirectTo: '/vendor/dashboard' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorRoutingModule { }

