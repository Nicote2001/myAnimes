import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';
import { MenuApiCallerService } from '../ApiCallerService/menu.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { AnimeWatch } from '../objects/animeWatch.model';
import { RecentAnimeMenu } from '../objects/recentAnimeMenu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public recommandationAnimes: IAnime[] = [];
  public recentAnimes: AnimeWatch[] = [];
  public page: number = 1; //current page
  public totalAnimes : any;
  public animesPerPage = 16;
  faAngleRight = faAngleRight
  faAngleLeft = faAngleLeft

  constructor(private api : MenuApiCallerService, private router: Router) 
  {
  }

  ngOnInit(): void {
    this.getRecommandationAnime();
    this.getRecentAnimes(this.page);
    console.log();
  }

  getRecommandationAnime()
  {
    this.api.getRecommandationAnimes().subscribe(data =>{
      for(let i = 0; i < 3; i++)
      {
        this.recommandationAnimes.push(data.data[i].entry[0]);
        this.recommandationAnimes.push(data.data[i].entry[1]);
      }
    })
  }

  onClickChangePage(number: number)
  {
    if(this.page + number > 0)
    {
      this.page += number;
      this.getRecentAnimes(this.page)
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
