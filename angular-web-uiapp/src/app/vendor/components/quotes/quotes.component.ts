import { Component, OnInit } from '@angular/core';
import { MetaDataInterface } from 'src/app/shared/components/hybrid-view/hybrid-view.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  
  quoteMetadata: MetaDataInterface
  quoteData: any[]

  constructor() { 
    this.quoteMetadata = {
      primaryColumnName: "_id",
      columns: [{
        name: "hospitalname",
        label: "Hospital"
      },{
        name: "name",
        label: "Factsheet Name"
      },{
        name: "price",
      },  {
        name: "status",
        label: "Status"
      }]
    }
  }

  ngOnInit(): void {

    this.quoteData = [{
      _id:'111',
      hospitalname: 'Health Hospital',
      name:'Factsheet 1',
      price: 3450,
      status:'New'
    },{
      _id:'123',
      hospitalname: 'Health Hospital',
      name:'Factsheet 2',
      price: 1200,
      status:'Pending'
    }]

  }

  
  menuItemClicked(name) {
    if (name == 'edit') {

    }
    if (name == 'update') {
      alert('update api request')
    }

  }

}
