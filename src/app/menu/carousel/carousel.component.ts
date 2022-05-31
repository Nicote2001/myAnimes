import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuApiCallerService } from 'src/app/ApiCallerService/menu.api-caller.service';
import { IAnime } from 'src/app/objects/anime.model';
import { AnimeDetail } from 'src/app/objects/animeDetail.model';
import { CommonService } from 'src/app/Shared/common.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() recommandationAnimes: AnimeDetail[];

  public topAnimes: IAnime[] = [];

  constructor(private commonService:CommonService, private router:Router) 
  {
    
  }

  ngOnInit(): void {
  }


  goToAnimeFromCarousel(animeTitle: string)
  {
    var formatedTitle = this.commonService.FormatAnimeTitle(animeTitle); 
    this.router.navigateByUrl('anime/'+formatedTitle+'/'+1);
  }
}
