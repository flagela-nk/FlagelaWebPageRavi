import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  locationValue:string
  entityName:string
  capacity:string
  cuisine:string


  noImageUrl = 'assets/images/no-image.png'

  entityTypeName: string = "HOSPITAL"
  searchResults: any[]
  selectedResult:any = null
  searchTextField:string = ''; // input for search

  demoRequestSelected = false;

  constructor(private authService: AuthService, private apiService:ApiService) {
    const role:any= this.authService.getRole();
   

    this.authService.isAuthenticated.subscribe(value => {
      // debugger;
      // alert(value)
    });
  }


  ngOnInit(): void {
    // debugger;
    var current_role = window.localStorage.getItem('ROLE');
    
    if(!current_role || current_role == 'NONE'){
      current_role = 'HOSPITAL';
    }
    this.entityTypeName = current_role;
    this.roleSelected(current_role);
  }

  // same as in home component
  roleSelected(role: string) {
    // debugger;
    window.localStorage.setItem('ROLE', role);
    
    const _role: any = role;
    this.authService.authenticatedRoleSubject.next(_role);
  }

  onKeyUp(e){
    if(e.key == "Enter") {
      this.search();
    }
  }


  search() {
    if (this.entityTypeName == "HOSPITAL") {

      let searchVendorsUrl = '/hospital/search-vendors?all=true' 
      + (this.locationValue ? '&location=' + this.locationValue : '')
      + (this.entityName ? '&name=' + this.entityName : '')
      + (this.capacity ? '&capacity=' + this.capacity : '')
      + (this.cuisine && this.cuisine !='any' ? '&cuisine=' + this.cuisine : '');

      console.log('searching-by ',searchVendorsUrl );

      this.apiService.get(searchVendorsUrl
      ).subscribe(
        data => { 
          this.searchResults = []
          data.forEach(element => {
            element['rating'] = element['rating'] || 0;
            if(element['images'] && element['images'].length > 0){
              element['images'] = element['images'].map(x => this.apiService.getImageUrl(x));
            }
            
            this.searchResults.push(element);
          });
          debugger;
        },
        error => console.error('Hospital Search-Vendors: ', error)
      )
    } else if (this.entityTypeName == "VENDOR") {
      this.apiService.get('/vendor/search-hospitals'
      + (this.locationValue ? '?location=' + this.locationValue : '')
      // + (this.locationValue ? '?minBedCapacity=' + this.locationValue : '')
      ).subscribe(
        data => this.searchResults = data,
        error => alert(error.toString())
      )

    } else if (this.entityTypeName == "PATIENT") {
      console.log('searching by ',this.locationValue )
      this.apiService.get('/patient/search-vendors' 
        + (this.locationValue ? '?location=' + this.locationValue : '')
        // + (this.locationValue ? '?location=' + this.locationValue : '')
      ).subscribe(
        data => { 
          this.searchResults = []
          data.forEach(element => {
            element['rating'] = element['rating'] || 0;
            this.searchResults.push(element);
          });
        },
        error => console.error('Vendor Search-Hospitals: ', error)
      )
    } 
  }

  clearSearchResults() {
    this.searchResults = [];
    this.searchTextField = '';
  }

  modalClosed(){
    this.demoRequestSelected = false;
    this.selectedResult = null;
  }

  searchResultItemClicked(id){
    
    // this.selectedResult = this.searchResults.filter(x => x.id == id)[0];

    

    if (this.entityTypeName == "HOSPITAL"){
      this.apiService.get('/hospital/search-vendors/' + id).subscribe(
        data => {
          this.selectedResult = data;
          if(data['images'] && data['images'].length > 0){
            data['images'] = data['images'].map(x => this.apiService.getImageUrl(x));
          }
          console.log('search-vendor-by-id result:', data)
        }
      );
      // get/load images for vendor by id
      // get licneses for vendor by id
      // get endorsements for vendor by id
      // get testimonials for vendor by id
    }
  }


}
