import { Component, OnInit, Input } from '@angular/core';
import { VendorListItem } from 'src/app/model/hospital/vendor-list-item';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  @Input() public vendors:VendorListItem[]

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
   

    
  }
}
