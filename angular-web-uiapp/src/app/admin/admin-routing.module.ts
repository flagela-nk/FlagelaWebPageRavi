import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateRouteGuard } from './can-activate.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

    {
        path: "admin",
        component: HomeComponent,
        canActivate: [CanActivateRouteGuard],
        children: [
            
            { path: "**", component: HomeComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
