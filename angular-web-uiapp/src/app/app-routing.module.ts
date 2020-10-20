import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthLogoutComponent } from './components/auth-logout/auth-logout.component';

import { CanActivateRouteGuard as CanActivateAdminRouteGuard } from './admin/can-activate.guard';
import { CanActivateRouteGuard as CanActivateHospitalRouteGuard } from './hospital/can-activate.guard';
import { CanActivateRouteGuard as CanActivateVendorRouteGuard } from './vendor/can-activate.guard';
import { CanActivateRouteGuard as CanActivateRestApiRouteGuard } from './rest-api/can-activate.guard';

import { HomeComponent as AdminHomeComponent } from './admin/home/home.component';
import { HomeComponent as RestApiHomeComponent } from './rest-api/home/home.component';
import { HomeComponent as HospitalHomeComponent } from './hospital/home/home.component';
import { HomeComponent as VendorHomeComponent } from './vendor/home/home.component';
import { RegisterComponent } from './components/register/register.component';


import { FactsheetsComponent } from './hospital/components/factsheets/factsheets.component';
import { SearchVendorsComponent } from './hospital/components/search-vendors/search-vendors.component';
import { ManageBidsComponent } from './hospital/components/manage-bids/manage-bids.component';
import { QuotesComponent } from './hospital/components/quotes/quotes.component';
import { OrdersComponent } from './hospital/components/orders/orders.component';
import { SearchComponent } from './components/search/search.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { OurPartnersComponent } from './components/our-partners/our-partners.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeUiComponent } from './components/home-ui/home-ui.component';
import { AppRouterComponent } from './components/app-router/app-router.component';

const routes: Routes = [
  { path: "about-us", component: AboutUsComponent },
  { path: "auth-register", component: RegisterComponent },
  { path: "auth-login", component: AuthLoginComponent },
  { path: "auth-logout", component: AuthLogoutComponent },
  { path: "search", component: SearchComponent },
  { path: "help-faq", component: HelpFaqComponent },
  { path: "our-partners", component: OurPartnersComponent },
  { path: "auth-profile", component: ProfileComponent },
  { path: "old-home", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent }, // default home
  
  
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page not found
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
