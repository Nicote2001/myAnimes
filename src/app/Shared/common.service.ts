import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { AnimeDetailsApiCallerService } from "../ApiCallerService/animeDetails.api-caller.service";
import { CommonErrorComponent } from "../errors/common-error/common-error.component";
import { IAnime } from "../objects/anime.model";

@Injectable({providedIn: 'root'})

export class CommonService
{
  modalRef: MdbModalRef<CommonErrorComponent> | null = null;

    constructor(public api: AnimeDetailsApiCallerService, public apiAnimeDetails: AnimeDetailsApiCallerService, private router: Router,  private modalService: MdbModalService)
    {

    }

    private rExp : RegExp = /[:;°!.★]/g;
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

    async goToAnime(anime : IAnime)
    {
        var isFound = false;

      this.apiAnimeDetails.getAnimeById(this.FormatAnimeTitle(anime.title)).subscribe(data =>{
        this.router.navigateByUrl('anime/'+this.FormatAnimeTitle(anime.title)+'/'+ 1);
        isFound = true;
      });
  
      this.apiAnimeDetails.getAnimeById(this.FormatAnimeTitle(anime.title_english)).subscribe(data =>{
        this.router.navigateByUrl('anime/'+this.FormatAnimeTitle(anime.title_english)+'/'+ 1);
        isFound = true;
      })
  
      await this.delay(1000);
      
      if(!isFound)
      {
        this.openErrorComponent('This anime is not available for the moment !');
      }
    }

    openErrorComponent(message:string)
    {
      this.modalRef = this.modalService.open(CommonErrorComponent, {
        modalClass: 'modal-dialog-centered modal-lg',
        data: { message: message}
      });
    }
}