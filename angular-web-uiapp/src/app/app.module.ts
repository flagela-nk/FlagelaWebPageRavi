import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { CanActivateRouteGuard as CanActivateHospitalRouteGuard } from './hospital/can-activate.guard';
import { CanActivateRouteGuard as CanActivateVendorRouteGuard } from './vendor/can-activate.guard';
import { CanActivateRouteGuard as CanActivatePatientRouteGuard } from './patient/can-activate.guard';
import { CanActivateRouteGuard as CanActivateAdminRouteGuard } from './admin/can-activate.guard';
import { CanActivateRouteGuard as CanActivateRestApiRouteGuard } from './rest-api/can-activate.guard';


import { CoreModule } from './core/core.module';
import {
  HeaderComponent,
  SharedModule
} from './shared';
import { HospitalModule } from './hospital/hospital.module';
import { VendorModule } from './vendor/vendor.module';
import { AdminModule } from './admin/admin.module';
import { PatientModule } from './patient/patient.module';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthLogoutComponent } from './components/auth-logout/auth-logout.component';
import { RegisterComponent } from './components/register/register.component';

import { SearchComponent } from './components/search/search.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { OurPartnersComponent } from './components/our-partners/our-partners.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { RestApiModule } from './rest-api/rest-api.module';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeUiComponent } from './components/home-ui/home-ui.component';
// import { AppRouterComponent } from './components/app-router/app-router.component';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
    RegisterComponent,    
    SearchComponent, 
    HelpFaqComponent, 
    OurPartnersComponent,
    
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    HomeUiComponent,
    // AppRouterComponent
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,

    RestApiModule,
    HospitalModule,
    VendorModule,
    PatientModule,
    AdminModule,

    AppRoutingModule, /* Must be in last because to prevent wild card routes */
  ],
  providers: [
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    CanActivateHospitalRouteGuard,
    CanActivateVendorRouteGuard,
    CanActivatePatientRouteGuard,
    CanActivateAdminRouteGuard,
    CanActivateRestApiRouteGuard
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }



/*
netstat -ano|findstr "PID :8081"
taskkill /pid 13048 /f
*/