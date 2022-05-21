import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnime } from '../objects/anime.model';

@Injectable({providedIn: 'root'})

export class MenuApiCallerService 
{
    topAnimes: IAnime[] = [];
    constructor(private http : HttpClient)
    {

    }

    public getTopAnimes(): Observable<any>
    {
        return this.http.get<any>('https://api.jikan.moe/v4/top/anime');
    }

    public getRecommandationAnimes(): Observable<any>
    {
        return this.http.get<any>('https://api.jikan.moe/v4/recommendations/anime?filter=bypopularity');
    }

    public getTopManga(): Observable<any>
    {
        return this.http.get<any>('https://api.jikan.moe/v4/top/anime?filter=airing');
    }

    public getRecentAnimes(page: number): Observable<any>
    {
        return this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/recentlyadded/'+page)
    }
}