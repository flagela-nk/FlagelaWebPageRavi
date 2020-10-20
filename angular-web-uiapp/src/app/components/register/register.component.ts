import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerAs = ""

  registerForm: FormGroup

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  setRegisterFormType(registerAs: string) {
    this.registerAs = registerAs

    this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl('', Validators.email),
      password: new FormControl(),
      password2: new FormControl(),
      role: new FormControl(),
    })

    this.registerForm.patchValue({ role: registerAs});

    if (registerAs == "ADMIN") {

    }
    else if (registerAs == "HOSPITAL") {
      this.registerForm.addControl('hospitalName', new FormControl());
      this.registerForm.addControl('hospitalAddress', new FormControl());
    }
    else if (registerAs == "VENDOR") {
      this.registerForm.addControl('businessName', new FormControl());
      this.registerForm.addControl('businessType', new FormControl());
    }
    else if (registerAs == "PATIENT") {
    }
    else {
      this.registerForm = null
    }
  }


  signUp() {
    if (this.registerForm.valid) {

      if (this.registerForm.value.password != this.registerForm.value.password2)
        alert("password doesn't match");

        var data = {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
          name: this.registerForm.value.firstname + (this.registerForm.value.firstname && this.registerForm.value.lastname ? ' ' : '') + this.registerForm.value.lastname,
          password: this.registerForm.value.password,
          phoneNumber: this.registerForm.value.phoneNumber,
          role: this.registerAs
        }

        if(this.registerAs == 'VENDOR'){
          data['businessName'] = this.registerForm.value.businessName;
          data['businessType'] = this.registerForm.value.businessType;
        }

      this.apiService.post('/auth/register', data).subscribe(data => this.router.navigateByUrl('/auth-login'),
        error => {
          console.error('registration failed', error)
          alert('registration failed')
        });
    } else {
      alert('Form is not valid')
    }
  }

}

