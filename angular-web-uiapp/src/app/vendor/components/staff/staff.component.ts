import { Component, OnInit } from '@angular/core';
import { MetaDataInterface } from 'src/app/shared/components/hybrid-view/hybrid-view.component';
import { ApiService } from 'src/app/core/services/api.service';
import { MenuItemInterface } from 'src/app/shared/components/menu/menu.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  menuItems: MenuItemInterface[]

  staffListMetadata: MetaDataInterface
  staffListData: any[]


  constructor(private apiService: ApiService) {

    this.menuItems = [{ name: 'new' }, { name: 'clear', disabled: true }]

    this.staffListMetadata = {
      primaryColumnName: "_id",
      columns: [{
        name: "name",
        label: "Name"
      }, {
        name: "title",
        label: "Title"
      }, {
        name: "rating",
        label: "Rating",
        type: "rating"
      }]
    }
   }

  ngOnInit(): void {
    this.apiService.get('/mongo/vendor_staff/retrieveAll').subscribe(
      data => {
        console.log('StaffListData result:', data)
        this.staffListData = data;
      }, error => alert('error on get vendor_staff results')
    )
  }

  
  menuItemClicked(name) {
    if (name == 'create') {
      // this.staffFormSubmit();
      alert('create called')
    }
    if (name == 'edit') {

    }
    if (name == 'update') {
      alert('update api request')
    }

  }


}
