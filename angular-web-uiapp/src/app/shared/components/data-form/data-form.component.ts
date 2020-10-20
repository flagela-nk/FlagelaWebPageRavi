import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataTableInterface } from '../data-table/data-table.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {
  dataForm: FormGroup
  formCollectionName: string

  @Input() formMetadata: DataTableInterface
  @Input() formDataId: string
  // @Input() formCollectionName: string

  constructor(private apiService: ApiService, private router: Router) { 
    this.formCollectionName = this.router.url.replace('/rest-api/', '');
    // var urlItems = subUrl.split('/');
  }

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      _id: new FormControl()
    })
    if(this.formMetadata){
      this.formMetadata.columns.forEach( x => {
        if(x.name != '_id')
        this.dataForm.addControl(x.name, new FormControl())
      })
    }
    if(this.formCollectionName && this.formDataId){
      this.apiService.get('/mongo/' + this.formCollectionName + '/' + this.formDataId).subscribe(
        data => {
          console.log(data)
          this.dataForm.patchValue(data)
        },
        error => alert(error.message)
      )
    }
    else
      console.log('No Form Data available')
  }

  dataFormSubmit(){

  }

}
