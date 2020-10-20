import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/core/services/api.service';

import { environment } from '../../../../environments/environment'
import { MetaDataInterface, HybridViewComponent } from 'src/app/shared/components/hybrid-view/hybrid-view.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-manage-bids',
  templateUrl: './manage-bids.component.html',
  styleUrls: ['./manage-bids.component.scss']
})
export class ManageBidsComponent implements OnInit {
  
  @ViewChild(MenuComponent) private menuComponent: MenuComponent
  @ViewChild(DataTableComponent) private dataTable: DataTableComponent
  @ViewChild(HybridViewComponent) private hybridView: HybridViewComponent
  
  hospitals = []
  factsheets = []
  
  bidForm:FormGroup
  hospitalBidMetadata: MetaDataInterface
  hospitalBidData: any[]

  constructor(private apiService:ApiService, private fb:FormBuilder) { 
    this.hospitalBidMetadata = {
      primaryColumnName: "id",
      columns: [{
        name: "title"
      },{
        name: "hospital_name",
        label: "Hospital Name"
      },{
        name: "factsheet_name",
        label: "Factsheet Name"
      },{
        name: "status",
        label: "Status"
      },{
        name: "opened_date",
        label: "Opened On"
      }]
    }
  }

  ngOnInit(): void {

    this.bidForm = new FormGroup({
      'id':new FormControl( ),
      'title':new FormControl( ),
      'opened_date':new FormControl( ),
      'hospital_id':new FormControl( ),
      'factsheet_id':new FormControl(),
      'details':new FormControl(),
      'status':new FormControl('ACTIVE'),
    })

    // this.clearForm();
    this.apiService.get('/hospital/bids').subscribe(data => {
      this.hospitalBidData = data
    });

    this.apiService.get('/hospital/user-hospitals').subscribe(data => {
      this.hospitals = data
    });

    this.apiService.get('/hospital/factsheet').subscribe(data => {
      this.factsheets = data
    });

  }

  menuItemClicked(name){
    if (name == 'edit') {
      this.bidForm.setValue(this.hospitalBidData.filter(x=> x.id == this.hybridView.currentRecord)[0]);
    }
  }

  setHospitalId(){
    var factsheetId = this.bidForm.value.factsheet_id;
    if(factsheetId){
      var hospitalId = this.hospitalBidData.filter(x => x.id == factsheetId)[0].hospital_id;
      this.bidForm.patchValue({
        hospital_id : hospitalId
      });
    }
  }


  bidFormSubmit(){
    // alert(JSON.stringify(this.bidForm.value))
    if(this.bidForm.invalid) {
      alert('Form is not completely filled');
      return;
    }

    this.apiService.post('/hospital/bids/create', this.bidForm.value).subscribe(data => {
      // alert('Created' + JSON.stringify( data))
      this.bidForm.patchValue(data)
    })
  }


  activateBidEvent(){
    this.bidForm.patchValue({status:"ACTIVE"});
    this.bidFormSubmit();
  }
  deactivateBidEvent(){
    this.bidForm.patchValue({status:"INACTIVE"});
    this.bidFormSubmit();
  }
/*
  setHospitalId(){
    var factsheetId = this.bidForm.value.factsheet_id;
    if(factsheetId){
      var hospitalId = this.factsheets.filter(x => x.id == factsheetId)[0].hospital_id;
      this.bidForm.patchValue({
        hospital_id: hospitalId
      });
    }
  }*/


}


