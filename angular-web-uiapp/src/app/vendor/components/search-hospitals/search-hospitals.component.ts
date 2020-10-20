import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-hospitals',
  templateUrl: './search-hospitals.component.html',
  styleUrls: ['./search-hospitals.component.scss']
})
export class SearchHospitalsComponent implements OnInit {
  @Output() public searchEvent = new EventEmitter<string>()
  searchTextField:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  clearGridItems(){
    alert('Clear List')
  }

  onKeyUp(e){
    if(e.key == "Enter") {1 
      console.log('Searching by : ',this.searchTextField);
      let searchBy:string = this.searchTextField;// 'Aberdeen'
      if(searchBy)
        this.searchEvent.emit(searchBy.toLowerCase().trim());
    }
  }

}
