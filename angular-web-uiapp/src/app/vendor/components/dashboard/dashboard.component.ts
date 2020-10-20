import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  checklistItems: any[]
  staffHealthIssues: any[]
  overallRating: any[]
  todaysMenu: any[]

  //currentView: 'OVERVIEW' | 'METRICS' | 'OPERATIONS' | 'RATINGS'

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //this.currentView = 'OVERVIEW'
    this.apiService.get('/vendor/checklist').subscribe(
      data => {
        // console.log('Checklist', data);
        this.checklistItems = data; 
      },
      error => console.error('Vendor Checklist get request:', error)
    );    

    this.apiService.get('/vendor/staff-health').subscribe(
      data => {
        console.log('Staff Health Issues', data);
        this.staffHealthIssues = data; 
      },
      error => console.error(error)
    )
  }



}
