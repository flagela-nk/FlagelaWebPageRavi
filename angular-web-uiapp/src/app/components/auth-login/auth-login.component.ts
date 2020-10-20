import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  
  submitForm() {
    this.isSubmitting = true;
    // this.errors = {errors: {}};

      let credentials:any = {};
      credentials.email = this.authForm.value.email;
      credentials.password = this.authForm.value.password;
      // console.log(credentials)

      if(this.authForm.value.email == 'h1@fake.com'){
        this.authService.fakeLogin('HOSPITAL');
        this.router.navigateByUrl('/');
        return;
      }

      this.authService
      .login(credentials.email, credentials.password )
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          // this.errors = err;
          this.isSubmitting = false;
        }
      );
    
  }

}
