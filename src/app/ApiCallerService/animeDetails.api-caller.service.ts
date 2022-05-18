import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnime } from '../objects/anime.model';

@Injectable({providedIn: 'root'})

export class AnimeDetailsApiCallerService 
{
    topAnimes: IAnime[] = [];
    constructor(private http : HttpClient)
    {

    }

    public getAnimeWAtch(animeId: string, episode:number): Observable<any>
    {
        return this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/watching/'+animeId+'/'+episode);
    }

    public getAnimeById(animeId:string){
        return this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/details/' + animeId)
    }
    
}