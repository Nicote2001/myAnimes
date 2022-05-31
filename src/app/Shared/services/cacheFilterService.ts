import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { FilterAnimeApiCallerService } from "src/app/ApiCallerService/filterAnime.api-caller.service";

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class CacheFilterService {

  
  private cacheGenre$: Observable<any>;
  private cacheProducers$: Observable<any>;

  constructor(private api: FilterAnimeApiCallerService) { }

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
}