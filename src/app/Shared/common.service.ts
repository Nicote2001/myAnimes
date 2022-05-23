import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class CommonService
{
    constructor()
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
            else if(this.rExp.test(animeTitle[i]))
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
}