import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';
import { MenuApiCallerService } from '../ApiCallerService/menu.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { AnimeDetail } from '../objects/animeDetail.model';
import { AnimeKitus } from '../objects/animeKitsu.model';
import { AnimeWatch } from '../objects/animeWatch.model';
import { CommonService } from '../Shared/common.service';
import { CacheFilterService } from '../Shared/services/cacheFilterService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public recommandationAnimesPreFetch: IAnime[] = [];
  public recommandationAnimes: AnimeKitus[] = [];
  public recentAnimes: AnimeWatch[] = [];
  public page: number = 1; //current page
  public totalAnimes : any;
  public animesPerPage = 16;
  faAngleRight = faAngleRight
  faAngleLeft = faAngleLeft

  constructor(private api : MenuApiCallerService, private router: Router, private apiDetails : AnimeDetailsApiCallerService,
    private cacheService:CacheFilterService) 
  {
  }

  ngOnInit(): void {
    this.getRecommandationAnime();
    this.getRecentAnimes(this.page);
    console.log();
  }

  async getRecommandationAnime()
  {
    this.api.getRecommandationAnimes().subscribe(data =>{
      for(let i = 0; i < 3; i++)
      {
        this.recommandationAnimesPreFetch.push(data.data[i].entry[0]);
        this.recommandationAnimesPreFetch.push(data.data[i].entry[1]);
      }
        this.cacheService.getAnimesCarousel(this.recommandationAnimesPreFetch).then(x=>this.recommandationAnimes=x);
    })
  }

  onClickChangePage(number: number)
  {
    if(this.page + number > 0)
    {
      this.page += number;
      this.getRecentAnimes(this.page);
      window.scroll(0,600);
      
    }
  }

  getRecentAnimes(page: number){
    this.api.getRecentAnimes(page).subscribe(data =>{
      this.recentAnimes = data.results;
    })
  }

  goToAnime(anime : AnimeWatch)
  {
    this.router.navigateByUrl('anime/'+anime.id+'/'+anime.episodenumber);
  }

}
