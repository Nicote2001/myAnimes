import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { GlobalPagesAnimesApiCallerService } from '../ApiCallerService/globalPagesAnimes.api-caller.service';
import { AnimeWatch } from '../objects/animeWatch.model';

@Component({
  selector: 'app-popular-animes',
  templateUrl: './popular-animes.component.html',
  styleUrls: ['./popular-animes.component.scss']
})
export class PopularAnimesComponent implements OnInit {

  page: number = 1;
  animes: AnimeWatch[];
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  constructor(private api: GlobalPagesAnimesApiCallerService, private router: Router) { }

  ngOnInit(): void {
    this.getPopularAnimes(this.page);
  }

  onClickChangePage(number: number)
  {
    if(this.page + number > 0)
    {
      this.page += number;
      this.getPopularAnimes(this.page);
      window.scroll(0,0);
    }
  }

  getPopularAnimes(page: number)
  {
    this.api.getPopularAnimes(page).subscribe(data =>{
      this.animes = data.results;
    })
  }

  goToAnime(anime : AnimeWatch)
  {
    this.router.navigateByUrl('anime/'+anime.id+'/'+1);
  }

}
