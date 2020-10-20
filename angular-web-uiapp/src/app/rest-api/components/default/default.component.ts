import { Component, OnInit } from '@angular/core';
import { MetaDataInterface } from 'src/app/shared/components/hybrid-view/hybrid-view.component';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  collectionName: string

  metadata: MetaDataInterface
  data: any[]

  constructor(private apiService: ApiService, private router: Router) {
    this.collectionName = this.router.url.replace('/rest-api/', '');
    this.setMetadata();
    this.getData();
  }

  ngOnInit(): void {

    this.router.events.subscribe(x => {
      this.setMetadata()
      this.getData()
    })


  }

  setMetadata() {
    this.collectionName = this.router.url.replace('/rest-api/', '')

    this.metadata = {
      primaryColumnName: "_id",
      columns: []
    }
    if (this.collectionName == 'vendor') {
      this.metadata.columns.push(
        { name: 'name'}, 
        { name: 'type' },
        { name: 'address' },
        { name: 'city' },
        { name: 'state' },
        { name: 'county' },
        { name: 'zip' },
        { name: 'status' },
      )
    }
    else if (this.collectionName == 'user') {
      this.metadata.columns.push({
        name: 'name'
      }, {
        name: 'email'
      }, {
        name: 'password'
      }, {
        name: 'role'
      })
    }

    this.getData();

  }

  getData(){
    this.apiService.get('/mongo/' + this.collectionName + '/retrieveAll').subscribe(
      data => this.data = data,//this.hospitalForm.setValue(data),
      error => alert(error.message)
    )
  }


  menuItemClicked(name) {
    if (name == 'create') {
      this.apiService.post('/mongo/collectionName/create', {}).subscribe(
        data => this.collectionName = this.collectionName,//this.hospitalForm.setValue(data),
        error => alert(error.message)
      )
    }
    if (name == 'edit') {

    }
    if (name == 'update') {
      alert('update api request')
    }

  }

}
