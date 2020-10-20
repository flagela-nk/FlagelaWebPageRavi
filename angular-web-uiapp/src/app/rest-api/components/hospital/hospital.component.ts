import { Component, OnInit } from '@angular/core';
import { MetaDataInterface } from 'src/app/shared/components/hybrid-view/hybrid-view.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  
  hospitalMetadata: MetaDataInterface
  hospitalData: any[]
  hospitalForm: FormGroup

  constructor(private apiService: ApiService) {

    this.hospitalMetadata = {
      primaryColumnName: "_id",
      columns: [{
        name: "name",
        label: "Hospital Name"
      }]
    }

   }

  ngOnInit(): void {

    this.hospitalForm = new FormGroup({
      _id: new FormControl(),
      name: new FormControl(),
    })
  }

  hospitalFormSubmit(){
    alert('submitted')
  }

  menuItemClicked(name) {
    if (name == 'create') {
      this.apiService.post('/mongo/hospital/create', this.hospitalForm.value).subscribe(
        data => this.hospitalForm.setValue(data),
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
