import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AnimeUser } from 'src/app/objects/animeUser';
import { CommonService } from 'src/app/Shared/common.service';
import { AnimeUserService } from 'src/app/Shared/services/AnimeUser.service';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  email:string = " ";
  username:string = "";
  animes:AnimeUser[];

  constructor(private api: AnimeUserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUsernameAndEmail();
    this.getAnimes();
  }

  ResetPassword()
  {

  }

  async getAnimes()
  {
    this.animes = await this.api.getAnimeByUid();
    console.log(this.animes);
  }

  getUsernameAndEmail()
  {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }

  goToAnime(anime: AnimeUser)
  {
    console.log(anime.currentEpisode);
    this.router.navigateByUrl('anime/'+anime.animeId+'/'+anime.currentEpisode);
  }

  sendPasswordReset()
  {
      this.authService.forgotPassword(this.email);
  }

  saveUsername()
  {
    if(localStorage.getItem('username') !== this.username)
    {
      
    }
  }

}
