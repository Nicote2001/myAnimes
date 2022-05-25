import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AnimeDetailsApiCallerService } from "../ApiCallerService/animeDetails.api-caller.service";
import { IAnime } from "../objects/anime.model";

@Injectable({providedIn: 'root'})

export class CommonService
{
    constructor(public api: AnimeDetailsApiCallerService, public apiAnimeDetails: AnimeDetailsApiCallerService, private router: Router)
    {

    }

    private rExp : RegExp = /[:;°!.★]/g;
    private rExpReplace : RegExp = /[★]/g;

    public FormatAnimeTitle(animeTitle: string)
    {
        var formatedTitle = "";

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
        this.router.navigateByUrl('error/anime');
      }
    }
}