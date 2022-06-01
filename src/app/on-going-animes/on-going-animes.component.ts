import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { GlobalPagesAnimesApiCallerService } from '../ApiCallerService/globalPagesAnimes.api-caller.service';
import { AnimeWatch } from '../objects/animeWatch.model';

@Component({
  selector: 'app-on-going-animes',
  templateUrl: './on-going-animes.component.html',
  styleUrls: ['./on-going-animes.component.scss']
})
export class OnGoingAnimesComponent implements OnInit {

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
    }
  }

  getPopularAnimes(page: number)
  {
    this.api.getOnGoingAnimes(page).subscribe(data =>{
      this.animes = data.results;
    })
  }

}
