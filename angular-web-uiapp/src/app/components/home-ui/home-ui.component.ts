import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Typewriter from 't-writer.js';
@Component({
  selector: 'app-home-ui',
  templateUrl: './home-ui.component.html',
  styleUrls: [
    /*
    "../src/assets/static/css/all.min.css",
    "../src/assets/static/css/scrolling-nav.css",
    "../src/assets/static/css/animate.css",
    "../src/assets/static/css/style.css",*/
    './home-ui-all.component.scss',
    './home-ui-bootstrap.component.scss',
    './home-ui-scroll-nav.component.scss',
    './home-ui-styles.component.scss',
    './home-ui.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeUiComponent implements OnInit {
  selectedRole='HOSPITAL'

  @ViewChild('navbar') navbar: ElementRef;
  @ViewChild('fixedTop') fixedTop: ElementRef;

  @ViewChild('typewriter1') typewriterElement;
  
  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    var currentRole = window.localStorage.getItem('ROLE'); 
    if(currentRole)
      this.roleChanged(currentRole);

      const _typewriter1 = this.typewriterElement.nativeElement;
      const writer1 = new Typewriter(_typewriter1, {
        loop: true
      });
      writer1.type('Optimizing your manpower and inventory')
      .rest(2500)
      .clear()
      .type('Digitally monitoring your projects')
      .rest(2500)
      .clear()
      .type('Solving your cash-flow')
      .rest(2500)
      .clear()
      .start();
  }

  @HostListener('window:scroll') // for window scroll events
  onScroll(event:Event) {
    var offsetValue = this.navbar.nativeElement.offsetTop;
    // debugger;
    // console.log((event.target as Element).scrollTop);


    if(offsetValue > 50)
    this.fixedTop.nativeElement.classList.add("nav-scroll");
    else
    this.fixedTop.nativeElement.classList.remove("nav-scroll");
  }

  roleChanged(role:string){
    this.selectedRole = role;
    window.localStorage.setItem('ROLE',role); 
    const _role:any = role;
    this.authService.authenticatedRoleSubject.next(_role);
  }

}
