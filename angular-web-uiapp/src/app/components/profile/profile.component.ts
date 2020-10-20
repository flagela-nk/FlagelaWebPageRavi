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

  user:any
  role:String
  profileFormGroup: FormGroup

  constructor(private authService: AuthService, private apiService:ApiService) { 
    this.role = this.authService.getRole();
    
    this.profileFormGroup = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    });

    this.authService.currentUser.subscribe( data => {
      this.user = data
      this.profileFormGroup.patchValue({id: data.userId} )
    });

    this.apiService.get('/auth/profile/' + this.user.userId).subscribe( data => {
      console.log('Get_Profile', data)
      this.profileFormGroup.patchValue( data );
    }, error => console.error('Get_Profile_Error',error))
    
    if(this.role == 'HOSPITAL'){
      // this.profileFormGroup.addControl('bedCapacity', new FormControl());
    } else if(this.role == 'VENDOR'){
      // this.profileFormGroup.addControl('cuisines', new FormControl([]));
    }
  }

  ngOnInit(): void {
  }

  updateProfile(){

  }

}
