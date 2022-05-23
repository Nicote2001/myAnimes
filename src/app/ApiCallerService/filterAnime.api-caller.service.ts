import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnime } from '../objects/anime.model';

@Injectable({providedIn: 'root'})

export class FilterAnimeApiCallerService
{
    topAnimes: IAnime[] = [];
    constructor(private http : HttpClient)
    {

    }

    public getSearchBarAnime(search: string): Observable<any>
    {
        return this.http.get<any>('https://api.jikan.moe/v4/anime?letter='+search+'&type=tv');
        
    }

    public getAnimeById(animeId:string){
        return this.http.get<any>('https://krish-anime-api-98k6.vercel.app/api/details/' + animeId)
    }

    public getGenre(){
        return this.http.get<any>('https://api.jikan.moe/v4/genres/anime?filter=genres');
    }

    public getProducers(){
        return this.http.get<any>('https://api.jikan.moe/v4/producers')
    }

    public getAnimesSearchByFilter(apiRequest: string){
        return this.http.get<any>(apiRequest)
    }
    
}