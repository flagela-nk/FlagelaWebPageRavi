import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public vendors: any[]
  view: "DASHBOARD" | "SEARCH" | "MANAGE_BIDS" | "FACT_SHEETS" | "QUOTES" |"ORDERS" = "DASHBOARD"

  // currentHospitalReference: any

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {

    // this.currentHospitalReference = { _id: '123', name:'Hospital1'}
    /*
    this.http.post('http://localhost:5000/graphql', `
    {
      allUsers {
        nodes {
          email
          passwordHash
        }
      }
    }    
    `, 
    { headers: { "Content-Type" :"application/graphql" }
  }
    ).subscribe(data => {
      console.log('Graphql request for users:', data)
    }, error => { console.error(error)})
      */
  }

  search(searchBy: string) {
    this.apiService.get('/hospital/vendors?searchby=' + searchBy).subscribe(data => {
      this.vendors = data;
    })
  }




}
