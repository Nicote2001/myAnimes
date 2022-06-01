import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterAnimeApiCallerService } from '../ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from '../objects/anime.model';
import { CommonService } from '../Shared/common.service';
import { AuthService } from '../Shared/services/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { Location } from '@angular/common';
import { GlobalPagesAnimesApiCallerService } from '../ApiCallerService/globalPagesAnimes.api-caller.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchFilter:string;
  lastRequest:Date;
  animesResults: IAnime[] = [];
  isDropped: boolean=false;
  username:string;
  uid:string;
  islogged:boolean;
  isDroppedConnexion:boolean=false;
  randomAnime: IAnime;

  modalRef: MdbModalRef<LoginComponent| RegisterComponent> | null = null;
  
  constructor(
    private apiSearch: FilterAnimeApiCallerService, 
    private commonService: CommonService, 
    private router: Router,
    private authService: AuthService,
    private modalService: MdbModalService,
    private location: Location,
    private globalapi: GlobalPagesAnimesApiCallerService) { }

  ngOnInit(): void {
    this.searchFilter = "";
    this.lastRequest = new Date();
    this.logInformation();

  } 

  onKeyPress(search:any)
  {   
      if(search.data === null)
      {
          this.searchFilter = this.searchFilter.slice(0,-1);
      }
      else
      {
          this.searchFilter+=search.data;
      }
      console.log(this.searchFilter);

      this.getSearchBarAnimes();

  }

  getSearchBarAnimes()
  {
    this.apiSearch.getSearchBarAnime(this.searchFilter).subscribe(data =>{
      this.animesResults = data.data.slice(0,15);
      console.log(data);
    if(this.searchFilter ==="")
    {
      this.animesResults = [];
    }
    })
  }

  goToAnime(anime:IAnime)
  {
    this.commonService.goToAnime(anime);

    this.animesResults = [];
    this.searchFilter ="";
  }

  onClickDropped(){
    this.isDropped=!this.isDropped;
  }
  onClickDroppedConnexion(){
    this.isDroppedConnexion=!this.isDroppedConnexion;
  }
  async logInformation()
  { 
    await this.commonService.delay(1000);
    if(localStorage.getItem('username') !== null)
    {
      this.username = localStorage.getItem('username');
      this.uid = localStorage.getItem('token');
      this.islogged = true;
      this.isDroppedConnexion=false;
    }
  }

  logout()
  {   
      this.authService.logout();
      this.username = undefined;
      this.uid = undefined;
      this.islogged = false;
      this.isDroppedConnexion=false;

      if(this.location.path() === "/profil")
      {
        this.router.navigate(['']);
      }
  }

  openModalConnexion() 
  {
    this.modalRef = this.modalService.open(LoginComponent, {
      modalClass: 'modal-dialog-centered modal-lg'
    });
    this.modalRef.onClose.subscribe((message: boolean) => {
      if(message)
      {
        this.openModalRegister();
      }
      else
      {
        this.logInformation();
      }
    });
  }

  openModalRegister()
  {
    this.modalRef = this.modalService.open(RegisterComponent, {
      modalClass: 'modal-dialog-centered modal-lg'
    })
    this.modalRef.onClose.subscribe((message: boolean) => {
      if(message)
      {
        this.openModalConnexion();
      }
      else
      {
      }
    });
  }

  async goRandomAnime()
  {
    this.globalapi.getRandomAnime().subscribe(data =>{
      this.randomAnime = data.data;
      console.log(this.randomAnime);
      this.commonService.goToAnime(this.randomAnime,true);
    })
  }

}
