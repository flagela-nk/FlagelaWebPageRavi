import { Component, OnInit, ViewChild } from '@angular/core';
import { Factsheet } from 'src/app/model/hospital/factsheet-list';
import { MenuItemInterface, MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { DataTableInterface, DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { MetaDataInterface, HybridViewComponent } from 'src/app/shared/components/hybrid-view/hybrid-view.component';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-factsheets',
  templateUrl: './factsheets.component.html',
  styleUrls: ['./factsheets.component.scss']
})
export class FactsheetsComponent implements OnInit {

  @ViewChild(MenuComponent) private menuComponent: MenuComponent
  @ViewChild(DataTableComponent) private dataTable: DataTableComponent
  @ViewChild(HybridViewComponent) private hybridView: HybridViewComponent

  hospitalList: any[]

  factsheets: Factsheet[]
  currentFactsheet: Factsheet
  hospitals = []
  menuItems: MenuItemInterface[]

  factsheetForm: FormGroup

  factsheetListMetadata: MetaDataInterface
  factsheetListData: any[]

  constructor(private apiService: ApiService, private hospitalService:HospitalService) {
    // remove
    this.menuItems = [{ name: 'new' }, { name: 'clear', disabled: true }]

    this.factsheetListMetadata = {
      primaryColumnName: "id",
      columns: [
        {
          name: "name",
          label: "Name"
        }, {
          name: "hospital_name",
          label: "Hospital Name"
        }, {
          name: "current_number_of_patients",
          label: "Current Patient Count"
        }, {
          name: "estimated_number_of_patients_1m",
          label: "Estimated Patient Count"
        }/*, {
          name: "hospital_id",
          label: "Hospital ID"
        }*/
      ]
    }

    /*
    this.factsheetListData = [
      { "_id": "123", name: 'Factsheet1', hospitalId: '123' },
      { "_id": "234", name: 'Factsheet2', hospitalId: '234' }
    ]
    */


  }

  ngOnInit(): void {

    /*
    this.apiService.get('/hospital/user-hospitals').subscribe(
      data => {
        console.log(data)
        this.hospitalList = data;
      }, 
      error => console.error('Hospital Kitchen get request:', error)
    );
    */
   this.hospitalService.getHospitalList().subscribe(
    data => {
      console.log(data)
      this.hospitalList = data;
    }// ,     error => console.error('User Hospitals query request:', error)
   );

    this.apiService.get('/hospital/factsheet').subscribe(data => {
      this.factsheetListData = data
    });
    
    this.factsheetForm = new FormGroup({
      id: new FormControl(), 
      name: new FormControl(), // Factsheet name
      hospital_id: new FormControl(),
      //data: new FormGroup({
        //hospitalName: new FormControl(),
        //hospitalAddress: new FormControl(),
      contact_person_name: new FormControl(),
      contact_person_phone: new FormControl(),
      contact_person_email: new FormControl(),

      current_number_of_patients: new FormControl(),
      estimated_number_of_patients_1m: new FormControl(),
      estimated_number_of_patients_3m: new FormControl(),
      menu_attached: new FormControl(),
      menu_assistance_provided_by: new FormControl(),
      leave_policy: new FormControl(),
      tentative_start_date: new FormControl(),

      number_of_site_services: new FormControl(),
      number_of_service_boys_per_site: new FormControl(),
      timings_of_food_service: new FormControl()
      //})
    })

    /* Todo: remove
    this.factsheetForm.patchValue({
      name: 'Factsheet3',
      hospitalId: '345',
      data: {
        hospitalName: 'Health Hospital',
        hospitalAddress: '123 Cafeteria Lounge Dr'
      }
    });
    */


   this.apiService.get('/hospital/user-hospitals').subscribe(data => {
     this.hospitals = data
    });
    return;
    


  }

  menuItemClicked(name) {
    if (name == 'new') {
      this.factsheetForm.reset();
    }
    if (name == 'create') {
      this.factsheetFormSubmit();
    }
    if (name == 'edit') {

      this.factsheetForm.reset();
      this.factsheetForm.patchValue(this.factsheetListData.filter(x=> x.id == this.hybridView.currentRecord)[0]);
    }
    if (name == 'update') {
      this.apiService.post('/hospital/factsheet/update', this.factsheetForm.value).subscribe(data => {
        this.factsheetForm.patchValue(data);
      })
    }

  }

  factsheetFormSubmit() {

    this.apiService.post('/hospital/factsheet/create', this.factsheetForm.value).subscribe(data => {
      this.factsheetForm.patchValue(data);
    })

    return;
    
    this.apiService.post('/mongo/hospital_factsheet/create', this.factsheetForm.value).subscribe(data => {
      this.factsheetForm.patchValue(data);
    })
  }

}
