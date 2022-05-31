import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';
import { FilterAnimeApiCallerService } from '../ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss']

})
export class SearchAnimeComponent implements OnInit {

  apiCall:string;
  animes: IAnime[] = [];
  currentPage : number = 1;
  maxPage:number;

  faAngleRight = faAngleRight
  faAngleLeft = faAngleLeft


  constructor(public sanitizer: DomSanitizer, public api: FilterAnimeApiCallerService, private router: Router, private commonService:CommonService) 
  { 
    if(this.router.getCurrentNavigation().extras.state !== undefined){
      this.apiCall = this.router.getCurrentNavigation().extras.state.apiCall;
    }

    if(this.apiCall === undefined ||this.apiCall ==="" )
    {
      this.apiCall = "https://api.jikan.moe/v4/anime?genre=";
    }

    console.log(this.apiCall);
  }

  ngOnInit(): void {

    this.getAnimeResult(this.apiCall);
  }

  apiCallChange(call:string)
  {
    this.apiCall = call;
    this.getAnimeResult(this.apiCall);
  }

  getAnimeResult(call:string){
    this.api.getAnimesSearchByFilter(this.apiCall).subscribe(data =>{
      this.animes = data.data.slice(0,25);
      this.maxPage = data.pagination.last_visible_page;
    });
    this.currentPage = 1;
  }

  async goToAnime(anime : IAnime)
  {
    await this.commonService.goToAnime(anime);
  }

  onClickChangePage(number: number)
  {
    if(this.currentPage + number > 0 && this.currentPage + number <= this.maxPage)
    {
      this.currentPage += number;
      this.api.getAnimesSearchByFilter(this.apiCall+="&page="+this.currentPage).subscribe(data =>{
        this.animes=data.data.slice(0,25);
      });
    }
  }
}
