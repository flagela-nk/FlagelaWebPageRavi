import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  view: "DASHBOARD" | "SEARCH" | "MANAGE_BIDS" | "APPLICATIONS" | "QUOTES" |"ORDERS" = "DASHBOARD"
  public hospitals: any[]
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  
  search(searchBy: string) {
    this.apiService.get('/vendor/hospitals?searchby=' + searchBy).subscribe(data => {
      this.hospitals = data;
    })
  }

  
}
