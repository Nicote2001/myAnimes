import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';
import { FilterAnimeApiCallerService } from '../ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from '../objects/anime.model';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss']
})
export class SearchAnimeComponent implements OnInit {

  apiCall:string;
  animes: IAnime[] = [];

  constructor(private route:ActivatedRoute, public sanitizer: DomSanitizer, public api: FilterAnimeApiCallerService, private router: Router) 
  { 
    this.apiCall = this.router.getCurrentNavigation().extras.state.apiCall;

    route.params.subscribe(val => {
      this.apiCall = this.route.snapshot.paramMap.get('apiCall');
      console.log(this.apiCall);
    });
  }

  ngOnInit(): void {

    this.api.getAnimesSearchByFilter(this.apiCall).subscribe(data =>{
      this.animes=data.data;
    })
  }

}
