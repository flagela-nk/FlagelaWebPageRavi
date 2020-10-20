import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  checklistItems: any[]
  todaysMenu: any[]  
  staffHealth: any[]  
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get('/hospital/checklist').subscribe(
      data => {
        this.checklistItems = data
      }, 
      error => console.error('Hospital Checklist get request:', error)
    );

    this.apiService.get('/hospital/todays-menu').subscribe(
      data => {
        this.todaysMenu = data
      }, 
      error => console.error('Hospital Todays Menu get request:', error)
    );

    this.apiService.get('/hospital/staff-health').subscribe(
      data => {
        this.staffHealth = data
      }, 
      error => console.error('Hospital Staff Health get request:', error)
    );

  }
}
