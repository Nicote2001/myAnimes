import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animeas';
  isHidden;

  constructor( private router: Router, private location: Location) 
  {
    router.events.subscribe(val => {
      if (location.path() == "/contact-us") {
          this.isHidden = true;
      } else {
         this.isHidden = false;
      }
    });
  }
}
