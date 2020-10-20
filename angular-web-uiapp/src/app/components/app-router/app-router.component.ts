import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-route',
  templateUrl: './app-router.component.html',
  styleUrls: ['./app-router.component.scss']
})
export class AppRouterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    var path = this.router.url;
    if(path) path = path.replace('%3F','?').replace('%3D', '=');
    console.log('App-Route-Url: ' , path);
    if(path.startsWith('/?path=')){

      // debugger;
      var new_path = this.router.url.replace('/?path=', '');
      this.router.navigate([new_path]);
    }else this.router.navigate(['home']);
    return;
    if(path == '/'){
       this.router.navigate(['home']);
       return;
    }
    if(path.replace('app-route', '')){
      this.router.navigate([path.replace('app-route', '')]);
    }
  }

}
