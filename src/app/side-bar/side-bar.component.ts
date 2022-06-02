import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCake, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { MenuApiCallerService } from '../ApiCallerService/menu.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public topAnimes: IAnime[] = [];
  public topAnimeNow: IAnime[] = [];
  faRankingStar = faRankingStar;
  isHidden;

  constructor(private api:MenuApiCallerService, private commonService: CommonService, private router: Router, private location: Location) 
  {
  }

  ngOnInit(): void {
    this.getTopAnimes();
    this.getTopManga();
  }


  //functions
  getTopAnimes()
  {
    this.api.getTopAnimes().subscribe(data =>{
      this.topAnimes = data.data.slice(0,5);
    })
  }

  getTopManga()
  {
    this.api.getTopManga().subscribe(data =>{
      this.topAnimeNow = data.data.slice(0,5);
    })
  }

  goToAnimeFromRanking(anime: IAnime)
  {
    this.commonService.goToAnime(anime);
  }

}
