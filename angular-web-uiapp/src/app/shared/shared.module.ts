import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { MenuComponent } from './components/menu/menu.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { HybridViewComponent } from './components/hybrid-view/hybrid-view.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { RatingComponent } from './components/rating/rating.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';



@NgModule({
  declarations: [MenuComponent, 
    DataTableComponent, 
    DataFormComponent, 
    HybridViewComponent, RatingComponent, SidebarComponent, 
    //FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    MenuComponent, 
    DataTableComponent, 
    DataFormComponent,
    HybridViewComponent,
    RatingComponent,
    SidebarComponent
    /*
    HeaderComponent,
    FooterComponent*/
  ]
})
export class SharedModule { }

/*

    
*/
