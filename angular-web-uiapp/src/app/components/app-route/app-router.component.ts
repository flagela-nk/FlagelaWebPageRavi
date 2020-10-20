import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-route',
  templateUrl: './app-route.component.html',
  styleUrls: ['./app-route.component.scss']
})
export class AppRouterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    var path = this.router.url;
    console.log('App-Route-Url: ' + path);
    if(path.replace('app-route', '')){
      this.router.navigate([path.replace('app-route', '')]);
    }
  }

}
