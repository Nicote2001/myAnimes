import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuApiCallerService } from 'src/app/ApiCallerService/menu.api-caller.service';
import { IAnime } from 'src/app/objects/anime.model';
import { AnimeDetail } from 'src/app/objects/animeDetail.model';
import { AnimeKitus } from 'src/app/objects/animeKitsu.model';
import { CommonService } from 'src/app/Shared/common.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() recommandationAnimes: AnimeKitus[];

  public topAnimes: IAnime[] = [];

  constructor(private commonService:CommonService, private router:Router) 
  {
    
  }

  ngOnInit(): void {
  }


  goToAnimeFromCarousel(anime: AnimeKitus)
  {
    this.commonService.goToAnime(new IAnime(anime.titles.en_jp,anime.titles.en,null,1,0,0,"",""))
  }
}
