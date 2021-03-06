import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeUser } from 'src/app/objects/animeUser';
import { CommonService } from 'src/app/Shared/common.service';
import { AnimeUserService } from 'src/app/Shared/services/AnimeUser.service';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  email:string = " ";
  username:string = "";
  animes:AnimeUser[];

  constructor(private api: AnimeUserService, private authService: AuthService, private router: Router, private userService: UserService, private commonServicee: CommonService) { }

  ngOnInit(): void {
    this.getUsernameAndEmail();
    this.getAnimes();
  }

  async getAnimes()
  {
    this.animes = await this.api.getAnimeByUid();
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

  async sendPasswordReset()
  {
      await this.authService.forgotPassword(this.email);
      this.commonServicee.openErrorComponent("A password reset link was sent to your email !", false);
  }

  saveUsername()
  {
    if(localStorage.getItem('username') !== this.username)
    {
      this.userService.updateUsername(this.username,localStorage.getItem('uid'));
    }
  }

  async deleteAnime(anime:AnimeUser)
  {
    var isSuccess = await this.api.deleteAnime(anime.animeId);

    if(isSuccess)
    {
      this.getAnimes();
    }
    else{
      alert('error');
    }
  }

}
