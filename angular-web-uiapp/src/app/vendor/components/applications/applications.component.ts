import { Component, OnInit } from '@angular/core';
import { MetaDataInterface } from 'src/app/shared/components/hybrid-view/hybrid-view.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  
  applicationMetadata: MetaDataInterface
  applicationData: any[]

  constructor() { 
    this.applicationMetadata = {
      primaryColumnName: "_id",
      columns: [{
        name: "hospitalname",
        label: "Hospital"
      },{
        name: "name",
        label: "Factsheet Name"
      },  {
        name: "status",
        label: "Status"
      }]
    }
  }

  ngOnInit(): void {

    this.applicationData = [{
      _id:'111',
      hospitalname: 'Health Hospital',
      name:'Factsheet 1',
      status:'New'
    },{
      _id:'123',
      hospitalname: 'Health Hospital',
      name:'Factsheet 2',
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
