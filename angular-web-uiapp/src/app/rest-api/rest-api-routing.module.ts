import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateRouteGuard } from './can-activate.guard';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [

    {
        path: "rest-api",
        component: HomeComponent,
        canActivate: [CanActivateRouteGuard],
        children: [
            { path: "hospital", component: HospitalComponent },
            { path: "**", component: DefaultComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestApiRoutingModule { }
