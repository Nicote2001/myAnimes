import { Component, OnInit } from '@angular/core';
import { faAngleDown, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FilterAnimeApiCallerService } from 'src/app/ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from 'src/app/objects/anime.model';
import { Filter } from 'src/app/objects/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private api: FilterAnimeApiCallerService) { }

  readonly genreString:string ="genre";
  readonly sortString:string ="sort";
  readonly yearString:string ="year";
  readonly statusString:string ="status";
  readonly apiStringBase:string = "https://api.jikan.moe/v4/anime?"

  genres : Filter[] = [];
  genreDropped : boolean;
  sort : Filter[] = [];
  years : Filter[] = [];
  status : Filter[] = [];
  animes : IAnime[];

  faAngleDown = faAngleDown;

  ngOnInit(): void {
    this.getGenres();
    this.genreDropped = false;
  }

  changeGenre(genre: Filter)
  {
    for(let i=0; i<this.genres.length; i++)
    {
      if(this.genres[i].title == genre.title)
      {
        genre.isActive = true;
        this.genres[i].isActive = true;
      }
    }
  }

  getGenres()
  {
    this.api.getGenre().subscribe(data =>{
      for(let i=0; i<19; i++)
      {
         this.genres.push(new Filter(data.data[i].mal_id,data.data[i].name,false));
      }
    })
  }

  onClickDrop(filter:string)
  {
      if(filter === this.genreString)
      {
        this.genreDropped = !this.genreDropped;
      }
      else if(filter === this.genreString)
      {
      }
  }

  onBlurDrop(filter:string)
  {
    if(filter === this.genreString)
      {
        this.genreDropped = false;
      }
  }

  SearchAnimesByFilter()
  {
    var apiCall = this.apiStringBase;

    if(this.genres.length>0)
    {
      if(apiCall !== this.apiStringBase)
      {
        //put &
      }


      for(let i=0; i<this.genres.length-1; i++)
      {
        if(this.genres[i].isActive === true){
          apiCall+=this.genres[i].mal_id+",";
        }
      }
      
      if(this.genres[this.genres.length-1].isActive === true){
        apiCall+=this.genres[this.genres.length-1].mal_id+",";
      }
    }

    this.api.getAnimesSearchByFilter(apiCall).subscribe(data =>{
      this.animes=data.data;
      console.log(this.animes);
    })
  }


}
