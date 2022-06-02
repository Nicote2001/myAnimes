import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class GlobalPagesAnimesApiCallerService
{
    constructor(private http : HttpClient)
    {

    }

    public getPopularAnimes(page:number): Observable<any>
    {
        return this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/popular/' + page)
    }

    public getRandomAnime(): Observable<any>
    {
        return this.http.get<any>('https://api.jikan.moe/v4/random/anime')
    }

    public getOnGoingAnimes(page:number): Observable<any>
    {
        return this.http.get<any>('https://api.jikan.moe/v4/seasons/now?page='+page)
    }

    public getUpComingAnimes(page:number)
    {
        return this.http.get<any>('https://api.jikan.moe/v4/seasons/upcoming?page='+page)
    }
    
}