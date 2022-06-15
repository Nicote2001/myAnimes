import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { FilterAnimeApiCallerService } from "src/app/ApiCallerService/filterAnime.api-caller.service";
import { MenuApiCallerService } from "src/app/ApiCallerService/menu.api-caller.service";
import { IAnime } from "src/app/objects/anime.model";
import { AnimeKitus } from "src/app/objects/animeKitsu.model";

const CACHE_SIZE = 2;

@Injectable({
  providedIn: 'root'
})
export class CacheFilterService {

  
  private cacheGenre$: Observable<any>;
  private cacheProducers$: Observable<any>;
  private cacheAnimesCarousel: AnimeKitus[];

  constructor(private api: FilterAnimeApiCallerService, private apiMenu: MenuApiCallerService) { }

  getGenre()
  {
    if (!this.cacheGenre$) {
      this.cacheGenre$ = this.api.getGenre().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cacheGenre$;
  }

  getProducers()
  {
    if (!this.cacheProducers$) {
      this.cacheProducers$ = this.api.getProducers().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cacheProducers$;
  }

  async getAnimesCarousel(animes:IAnime[])
  {
    //systeme cache home made
    var date = localStorage.getItem('animeCarouselDate');
    var cacheDate = new Date(date).getDate();
    var nowDate = new Date().getDate();
    
    if (date === undefined || date === null ) 
    {
      this.getCached(animes);
    }
    else
    {
      if(cacheDate !== nowDate)
      {
        this.getCached(animes);
      }
    }

    this.cacheAnimesCarousel = JSON.parse(localStorage.getItem('animeCarousel'));

    return this.cacheAnimesCarousel;
  }

  async getCached(animes:IAnime[])
  {
    var items = [];
    for(let i=0; i<animes.length; i++)
    { 
      var item = await this.apiMenu.getAnimeKitsuCarousel(animes[i]);
      if(item.coverImage)
      {
        items.push(item);
      }
    }
    this.cacheAnimesCarousel=items;
    localStorage.setItem('animeCarousel',JSON.stringify(this.cacheAnimesCarousel));
    localStorage.setItem('animeCarouselDate',JSON.stringify(new Date().toDateString()));
  }
}