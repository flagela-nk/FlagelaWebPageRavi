import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  display = true
  userRole:string
  constructor(private authService:AuthService,private router: Router) {
    router.events.subscribe(val =>
      {
        if (router.url == '/' || router.url == '' || router.url == '/home')
          this.display = false;
        else
          this.display = true;
      }
    );
    
   }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated
      }
    );

    this.authService.authenticatedRole.subscribe(
      item => {
        this.userRole = item
      }
    )

  }

}
