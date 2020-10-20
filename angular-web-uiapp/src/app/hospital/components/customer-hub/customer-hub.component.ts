import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-customer-hub',
  templateUrl: './customer-hub.component.html',
  styleUrls: ['./customer-hub.component.scss']
})
export class CustomerHubComponent implements OnInit {

  overallRating:any[] 
  testimonials: any[]
  feedback: any[]

  constructor(private apiService: ApiService) {


    
   }

  ngOnInit(): void {

    this.apiService.get('/hospital/ratings').subscribe(
      data => {
        this.overallRating = data;
      },
      error => console.error('Hospital Rating Error', error)
    )

    this.apiService.get('/hospital/testimonials').subscribe(
      data => {
        this.testimonials = data;
      },
      error => console.error('Hospital Testimonial Error', error)
    )

    this.apiService.get('/hospital/feedback').subscribe(
      data => {
        this.feedback = data;
      },
      error => console.error('Hospital Feedback Error', error)
    )

/*
    this.testimonials = [
      {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.', customerName: 'Person A'},
      {text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', customerName: 'Person B'},
    ];

    this.feedback = [
      {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.', customerName: 'Person A'},
      {text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', customerName: 'Person B'},
    ];
    */
  }

}
