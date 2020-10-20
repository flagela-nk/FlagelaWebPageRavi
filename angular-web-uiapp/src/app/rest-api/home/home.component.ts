import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collectionNames:string[]
  currentCollectionName:string = 'user'

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.get('/mongo/getAllCollectionNames').subscribe(data => {
      this.collectionNames = data
    })
  }

}
