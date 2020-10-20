import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  availableMenu: []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get('/patient/available-menu').subscribe(
      data => {
        this.availableMenu = data
      }, 
      error => console.error('From Patient Available Menu get request:', error)
    );
  }

}
