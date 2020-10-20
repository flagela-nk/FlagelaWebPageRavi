import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  purchasePeriod: "TODAY" | "THIS_WEEK" | "THIS_MONTH" | "THIS_YEAR" = "TODAY"
  inventoryKitchenId:any
  purchaseKitchenId:any

  kitchenList: any[]
  inventoryList: any[]
  purchaseSummary: any

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get('/hospital/kitchens').subscribe(
      data => {
        console.log(data)
        this.kitchenList = data
        if(this.kitchenList.length > 0) {
          this.getInventoryList(this.kitchenList[0].id);
          this.getPurchaseSummary(this.kitchenList[0].id);
        }
      }, 
      error => console.error('Hospital Kitchen get request:', error)
    );

  }

  refreshPurchases(period){
    if(period)
      this.purchasePeriod = period;
    this.getPurchaseSummary(this.purchaseKitchenId);
  }

  getPurchaseSummary(kitchenId){
    this.purchaseKitchenId = kitchenId;
    this.apiService.get('/hospital/purchase_summary/' + kitchenId + "?period=" + this.purchasePeriod).subscribe(
      data => {
        this.purchaseSummary = data
      }, 
      error => console.error('Hospital Purchase Summary get request:', error)
    );
  }

  getInventoryList(kitchenId){
    this.apiService.get('/hospital/inventory/' + kitchenId).subscribe(
      data => {
        this.inventoryList = data
      }, 
      error => console.error('Hospital Inventory get request:', error)
    );
  }

}
