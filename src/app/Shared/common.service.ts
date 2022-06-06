import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { AnimeCommonApiCallerService } from "../ApiCallerService/animeCommon.api-caller.service";
import { AnimeDetailsApiCallerService } from "../ApiCallerService/animeDetails.api-caller.service";
import { GlobalPagesAnimesApiCallerService } from "../ApiCallerService/globalPagesAnimes.api-caller.service";
import { CommonErrorComponent } from "../errors/common-error/common-error.component";
import { IAnime } from "../objects/anime.model";
import { AnimeDetail } from "../objects/animeDetail.model";
import { AnimeKitus } from "../objects/animeKitsu.model";
import { AnimeUser } from "../objects/animeUser";
import { AnimeUserService } from "./services/AnimeUser.service";

@Injectable({providedIn: 'root'})

export class CommonService
{
  modalRef: MdbModalRef<CommonErrorComponent> | null = null;

    constructor(public api: AnimeDetailsApiCallerService, public apiAnimeDetails: AnimeDetailsApiCallerService, private router: Router,  private modalService: MdbModalService, private animeUserSerivce: AnimeUserService, private globalApi: GlobalPagesAnimesApiCallerService, private apiCommon: AnimeCommonApiCallerService)
    {

    }

    private rExp : RegExp = /[:;°!.★)(]/g;
    private rExpReplace : RegExp = /[★]/g;

    public FormatAnimeTitle(animeTitle: string)
    {
        var formatedTitle = "";

        if(animeTitle)
        {
          for(let i = 0 ; i < animeTitle.length ; i++)
        {
            if(animeTitle[i] === " " || this.rExpReplace.test(animeTitle[i]))
            {
                formatedTitle += "-";
            }
            else if(this.rExp.test(animeTitle[i]) || animeTitle[i] == "!" ||  animeTitle[i] == "/")
            {
                formatedTitle += "";
            }
            else
            {
                formatedTitle += animeTitle[i];
            }
        }
        }

        return formatedTitle
    }

    public delay(ms: number) 
    {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async goToAnime(anime : IAnime, fromRandom:boolean=false)
    {
        var isFound = false;

        if(anime.title ==="Naruto: Shippuuden")
        {
          anime.title ="Naruto-Shippuden";
        }

        this.apiCommon.getAnimeById(this.FormatAnimeTitle(anime.title)).then(data =>{
        this.router.navigateByUrl('anime/'+this.FormatAnimeTitle(anime.title)+'/'+ 1);
        isFound = true;
        return;
      });
  
        this.apiCommon.getAnimeById(this.FormatAnimeTitle(anime.title_english)).then(data =>{
        this.router.navigateByUrl('anime/'+this.FormatAnimeTitle(anime.title_english)+'/'+ 1);
        isFound = true;
        return;
      })

       await this.apiCommon.getSearchAnimeGogo(this.FormatAnimeTitle(anime.title)).then(data =>{
         if(data.length>0){
          this.router.navigateByUrl('anime/'+this.FormatAnimeTitle(data[0].animeId)+'/'+ 1);
          isFound = true;
          return
         }
      })
      
      if(!isFound && !fromRandom)
      {
        this.openErrorComponent('This anime is not available for the moment !', false);
        return;
      }
      else if(!isFound && fromRandom)
      (
        this.globalApi.getRandomAnime().subscribe(data =>{
          this.goToAnime(data.data,true);
        })
      )
    }

    openErrorComponent(message:string, isSucess:boolean)
    {
      this.modalRef = this.modalService.open(CommonErrorComponent, {
        modalClass: 'modal-dialog-centered modal-lg',
        data: { message: message,
                isSucess: isSucess
        }
      });
    }

    async saveAnimeEpisode(animeId : string,anime : AnimeDetail, episode: number)
    {
      await this.animeUserSerivce.updateSave(new AnimeUser("",animeId,anime.title,anime.image,localStorage.getItem('uid'),episode,new Date().toString()));
    }
}