import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';
import { CommonErrorComponent } from '../errors/common-error/common-error.component';
import { AnimeDetail } from '../objects/animeDetail.model';
import { CommentsComponent } from './comments/comments.component';
import { EpisodesComponent } from './episodes/episodes.component';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.scss']
  
})
export class AnimeDetailComponent implements OnInit {

  animeId: string;
  episode: number;
  safeSrc: SafeResourceUrl;
  animeUrl: string;
  animeInfo: AnimeDetail;
  
  
  @ViewChild(EpisodesComponent) episodeComponent : EpisodesComponent;
  @ViewChild(CommentsComponent) commentComponent : CommentsComponent;

  constructor(private route:ActivatedRoute, public sanitizer: DomSanitizer, public api: AnimeDetailsApiCallerService, private router: Router) 
  { 
    route.params.subscribe(val => {
      if(this.route.snapshot.params['id'] !== this.animeId)
      {
        this.animeId = this.route.snapshot.params['id'];
        this.getAnimeInfo();
      }

      this.episode = this.route.snapshot.params['episode'];
      this.getWatch();
    });
  }

  ngOnInit(): void 
  {
  }

  getWatch()
  {
    this.api.getAnimeWAtch(this.animeId,this.episode).subscribe(data =>{
      this.animeUrl = data.link
      console.log(data);
      this.safeSrc = this.animeUrl;
    })

  }

  getAnimeInfo()
  {
    this.api.getAnimeById(this.animeId).subscribe(data =>{
      this.animeInfo = data.results[0];
      var episodes = data.results[0].totalepisode;
      this.episodeComponent.calculateLabels(episodes);
      this.commentComponent.GetCommentaire();
    })
  }

  changerEpisode(episode)
  {
    this.router.navigateByUrl('anime/'+this.animeId+'/'+episode);
  }

}
