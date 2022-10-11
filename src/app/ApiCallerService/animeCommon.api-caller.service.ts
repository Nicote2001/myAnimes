import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnime } from '../objects/anime.model';

@Injectable({providedIn: 'root'})

export class AnimeCommonApiCallerService 
{
    topAnimes: IAnime[] = [];
    constructor(private http : HttpClient)
    {

    }

    public getAnimeWAtch(animeId: string, episode:number): Promise<any>
    {
        return new Promise<any>((resolve)=> {
            this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/watching/'+animeId+'/'+episode).subscribe(animes => resolve(animes));
           })
    }

    public getAnimeById(animeId:string){
        return new Promise<any>((resolve)=> {
            this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/details/' + animeId).subscribe(animes => resolve(animes));
           })
    }

    public getSearchAnimeGogo(animeId:string)
    {
        return new Promise<any>((resolve)=> {
            this.http.get<any>('https://animea-gogoanime.herokuapp.com/search?keyw=' + animeId).subscribe(animes => resolve(animes));
           })
    }

    public getAnimeDetailGogo(animeId:string)
    {
        return new Promise<any>((resolve)=> {
            this.http.get<any>('"https://animea-gogoanime.herokuapp.com/anime-details/' + animeId).subscribe(animes => resolve(animes));
           })
    }

    public getAnimeUrlGogo(animeId:string)
    {
        return new Promise<any>((resolve)=> {
            this.http.get<any>('https://animea-gogoanime.herokuapp.com/vidcdn/watch/'+animeId+'-episode-1').subscribe(animes => resolve(animes));
           })
    }
    
    
}