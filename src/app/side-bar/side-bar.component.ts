import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCake, faRankingStar, faStar } from '@fortawesome/free-solid-svg-icons';
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
  public topMangas: IAnime[] = [];
  faRankingStar = faRankingStar;

  constructor(private api:MenuApiCallerService, private router:Router, private commonService: CommonService) { }

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
      this.topMangas = data.data.slice(0,5);
    })
  }

  goToAnimeFromRanking(animeTitle: string)
  {
    var formatedTitle = this.commonService.FormatAnimeTitle(animeTitle); 
    this.router.navigateByUrl('anime/'+formatedTitle+'/'+1);
  }

}
