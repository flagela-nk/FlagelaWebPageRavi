import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  selectedRole = "HOSPITAL";
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

    window.open('/assets/static/index.html', '_self');
    return;
    
    // debugger;
    var path = this.router.url;
    if(path)
      this.router.navigate(['/' + path.replace('/path=', '')]);


    const role:any = window.localStorage.getItem('ROLE') || "HOSPITAL";    
    this.authService.authenticatedRoleSubject.next(role);
    this.selectedRole = role;

    this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated
        if (!isAuthenticated)
        this.authService.authenticatedRoleSubject.next("HOSPITAL");
      }
    );

    this.authService.authenticatedRole.subscribe(
      item => {
        this.selectedRole = item ;
      }
    )
  }

  // re-used in search component
  roleSelected(role:string){
    // debugger;
    window.localStorage.setItem('ROLE',role);
    const _role:any = role;
    this.authService.authenticatedRoleSubject.next(_role);
  }

  logout(){
    let _selectedRole:any = this.selectedRole;
    this.authService.logout()
    this.selectedRole = _selectedRole;
    this.authService.authenticatedRoleSubject.next(_selectedRole);
  }

}

