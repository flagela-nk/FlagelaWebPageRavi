import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  display = true

  constructor(private router: Router) {

    router.events.subscribe(val =>
      {
        // console.log(window.location.href, router.url)
        if (router.url == '/' || router.url == '' || router.url == '/home')
          this.display = false;
        else
          this.display = true;
      }
    );
    
  }

  ngOnInit(): void {

  }

}
