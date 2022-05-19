import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchFilter:string;

  constructor() { }

  ngOnInit(): void {
    this.searchFilter = "";
  }

  onKeyPress(search:any)
  {   
      console.log("key", search.key);
      if(search.key === 'Delete' || search.key === 'Backspace')
      {
          this.searchFilter = this.searchFilter.slice(0,-1);
      }
      else
      {
          this.searchFilter+=search.key;
      }
      console.log(this.searchFilter);
  }

}
