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
  isHidenFilter;

  constructor( private router: Router, private location: Location) 
  {
    router.events.subscribe(val => {
      if (location.path() == "/contact-us") {
          this.isHidden = true;
          this.isHidenFilter = false;
      } else if(location.path() == "/anime/search")
      {
        this.isHidenFilter=true;
         this.isHidden = false;
      }
      else{
        this.isHidenFilter=false;
         this.isHidden = false;
      }
    });
  }
}
