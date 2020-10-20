import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  associatedVendors:any[]
  currentVendor:any
  user:any
  profileFormGroup: FormGroup

  constructor(private authService: AuthService, private apiService:ApiService) { 
        
    this.profileFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      address_line1: new FormControl(),
      address_line2: new FormControl(),
      address_line3: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
      zipcode: new FormControl(),

      current_capacity: new FormControl(),
      available_capacity: new FormControl(),
      cuisines: new FormControl([])
    });

    this.authService.currentUser.subscribe( data => {
      this.user = data
      this.profileFormGroup.patchValue({id: data.userId} )
debugger;
      this.apiService.get('/vendor/associated-vendors').subscribe( data => {
        console.log('associated vendors', data)
        this.associatedVendors = data;

        if(data && data.length > 0){ 
          this.currentVendor = data[0];
          this.profileFormGroup.patchValue( data[0] );
        }

      }, error=> console.error(error)
      );

    });

    

  }

  
  ngOnInit(): void {
  }

  updateProfile(){
    this.apiService.post('/vendor/update', this.profileFormGroup.value).subscribe(
      data=> { 
        console.log('successfully updated', data)
        this.profileFormGroup.patchValue(data)
      },
      error => console.error('profile update failed', error)
    )
  }

}
