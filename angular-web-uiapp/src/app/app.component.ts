import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-web-app';
  
  constructor() { }

  ngOnInit(): void {
    
    
    
  }
  
}
