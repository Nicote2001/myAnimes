import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GlobalPagesAnimesApiCallerService } from '../ApiCallerService/globalPagesAnimes.api-caller.service';
import { CommonAlertComponent } from '../errors/common-alert/common-alter.component';
import { IAnime } from '../objects/anime.model';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-on-going-animes',
  templateUrl: './on-going-animes.component.html',
  styleUrls: ['./on-going-animes.component.scss']
})
export class OnGoingAnimesComponent implements OnInit {

  currentPage: number = 1;
  animes: IAnime[];
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  maxPage:number;
  season:string;
  modalRef: MdbModalRef<CommonAlertComponent> | null = null;
  title:string;

  constructor(private api: GlobalPagesAnimesApiCallerService, private router: Router,private route:ActivatedRoute, private commonService:CommonService, private modalService: MdbModalService) {
    route.params.subscribe(val => {
      if(this.route.snapshot.params['moment'] !== this.season)
      {
        this.season = this.route.snapshot.params['moment'];
        this.getAnimes();
      }
    });
   }

  ngOnInit(): void {
    this.getAnimes();
  }



  onClickChangePage(number: number)
  {
    if(this.currentPage + number > 0 && this.currentPage + number <= this.maxPage)
    {
      this.currentPage += number;
      this.getAnimes();
      window.scroll(0,0);
    }
  }

  getAnimes()
  {
    if(this.season === "on-going")
    {
      this.title = "On Going"
      this.api.getOnGoingAnimes(this.currentPage).subscribe(data =>{
        this.animes=data.data.slice(0,25);
        this.maxPage = data.pagination.last_visible_page;
      });
    }
    else{ 
      this.title = "Up Coming"
      this.api.getUpComingAnimes(this.currentPage).subscribe(data =>{
        this.animes=data.data.slice(0,25);
        this.maxPage = data.pagination.last_visible_page;
      });

    }
    
  }


  async goToAnime(anime : IAnime)
  {
    if(this.season === "on-going"){
      await this.commonService.goToAnime(anime);
    }
    else
    {
      this.modalRef = this.modalService.open(CommonAlertComponent, {
        modalClass: 'modal-dialog-centered modal-lg',
        data: { title: anime.title,
                synopsis: anime.synopsis,
                image: anime.images.webp.image_url
        }
      });
    }
  }
}

