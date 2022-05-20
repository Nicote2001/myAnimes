import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterAnimeApiCallerService } from '../ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchFilter:string;
  lastRequest:Date;
  animesResults: IAnime[] = [];


  constructor(private apiSearch: FilterAnimeApiCallerService, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.searchFilter = "";
    this.lastRequest = new Date();
  }

  onKeyPress(search:any)
  {   
      if(search.data === null)
      {
          this.searchFilter = this.searchFilter.slice(0,-1);
      }
      else
      {
          this.searchFilter+=search.data;
      }
      console.log(this.searchFilter);

      this.getSearchBarAnimes();

  }

  getSearchBarAnimes()
  {
    this.apiSearch.getSearchBarAnime(this.searchFilter).subscribe(data =>{
      this.animesResults = data.data.slice(0,5);
      console.log(data);
      if(this.searchFilter ==="")
    {
      this.animesResults = [];
    }
    })
  }

  goToAnime(anime:string)
  {
    var formatedAnimeTitle = this.commonService.FormatAnimeTitle(anime)

    this.animesResults = [];
    this.searchFilter ="";

    this.router.navigateByUrl('anime/'+formatedAnimeTitle+'/'+1);
  }

}
