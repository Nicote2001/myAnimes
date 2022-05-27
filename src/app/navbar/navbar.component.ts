import { Time } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterAnimeApiCallerService } from '../ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { CommonService } from '../Shared/common.service';
import { AuthService } from '../Shared/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchFilter:string;
  lastRequest:Date;
  animesResults: IAnime[] = [];
  isDropped: boolean=false;
  username:string;
  uid:string;
  islogged:boolean;
  isDroppedConnexion:boolean=false;
  
  constructor(
    private apiSearch: FilterAnimeApiCallerService, 
    private commonService: CommonService, 
    private router: Router, 
    private location:Location, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.searchFilter = "";
    this.lastRequest = new Date();

    //detecte les changement de route pour changer le user si nécéssaire
    this.router.events.subscribe(val => {
      var ok = this.location.path();
      if(this.location.path() == "" || this.location.path() == "/")
      {
        this.logInformation();
      }
    });
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
      this.animesResults = data.data.slice(0,15);
      console.log(data);
    if(this.searchFilter ==="")
    {
      this.animesResults = [];
    }
    })
  }

  goToAnime(anime:string)
  {
    if(anime ==="Naruto: Shippuuden")
    {
      anime ="Naruto-Shippuden";
    }
    var formatedAnimeTitle = this.commonService.FormatAnimeTitle(anime)

    this.animesResults = [];
    this.searchFilter ="";

    this.router.navigateByUrl('anime/'+formatedAnimeTitle+'/'+1);
  }

  onClickDropped(){
    this.isDropped=!this.isDropped;
  }
  onClickDroppedConnexion(){
    this.isDroppedConnexion=!this.isDroppedConnexion;
  }
  async logInformation()
  { 
    await this.commonService.delay(500);
    if(localStorage.getItem('username') !== null)
    {
      this.username = localStorage.getItem('username');
      this.uid = localStorage.getItem('token');
      this.islogged = true;
      this.isDroppedConnexion=false;
    }
  }

  logout()
  {   
      this.authService.logout();
      this.username = undefined;
      this.uid = undefined;
      this.islogged = false;
      this.isDroppedConnexion=false;
  }

}
