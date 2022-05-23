import { Component, OnInit } from '@angular/core';
import { faAngleDown, faRankingStar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FilterAnimeApiCallerService } from 'src/app/ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from 'src/app/objects/anime.model';
import { Filter } from 'src/app/objects/filter.model';
import { NgForm } from '@angular/forms';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private api: FilterAnimeApiCallerService) { }

  readonly genreString:string ="genre";
  readonly producerString:string ="producer";
  readonly seasonString:string ="season";
  readonly yearString:string ="year";
  readonly statusString:string ="status";
  readonly sortString:string ="sort";
  readonly apiStringBase:string = "https://api.jikan.moe/v4/anime?"
  

  genres : Filter[] = [];
  genreDropped : boolean;
  
  producers : Filter[]= [];
  producerDropped : boolean;

  seasons : string;
  seasonyear : number;
  seasonDropped : boolean;

  startDate : Date;
  endDate : Date;
  yearDropped : boolean;

  faAngleDown = faAngleDown;
  faFilter = faFilter;

  animes : IAnime[] = [];

  sort:string;
  sortDropped: boolean;

  status:string;
  statusDropped: boolean;

  ngOnInit(): void {
    this.callStartFunction();
    this.genreDropped = false;
  }

  changeGenre(genre: Filter)
  {
    for(let i=0; i<this.genres.length; i++)
    {
      if(this.genres[i].title == genre.title)
      {
        genre.isActive = !genre.isActive;
        this.genres[i].isActive = genre.isActive;
      }
    }
  }

  changeProducer(producer: Filter)
  {
    for(let i=0; i<this.producers.length; i++)
    {
      if(this.producers[i].title == producer.title)
      {
        producer.isActive = !producer.isActive;
        this.genres[i].isActive = producer.isActive;
      }
    }
  }

  async getGenres()
  {
    this.api.getGenre().subscribe(async data =>{
      for(let i=0; i<19; i++)
      {
         this.genres.push(new Filter(data.data[i].mal_id,data.data[i].name,false));
      }
      await this.delay(1000);
      this.getProducers();
    })
  }

  getProducers()
  {
    this.api.getProducers().subscribe(data =>{
      for(let i=0; i<data.data.length; i++)
      {
         this.producers.push(new Filter(data.data[i].mal_id,data.data[i].name,false));
      }
      console.log(this.producers);
    })
  }

  onClickDrop(filter:string)
  {
      if(filter === this.genreString)
      {
        this.genreDropped = !this.genreDropped;
      }
      else if(filter === this.producerString)
      {
        this.producerDropped = !this.producerDropped;
      }
      else if(filter === this.yearString)
      {
        this.yearDropped = !this.yearDropped;
      }
      else if(filter === this.seasonString)
      {
        this.seasonDropped = !this.seasonDropped;
      }
      else if(filter === this.sortString)
      {
        this.sortDropped = !this.sortDropped;
      }
      else if(filter === this.statusString)
      {
        this.statusDropped = !this.statusDropped;
      }
      
  }

  onBlurDrop(filter:string)
  {
    if(filter === this.genreString)
      {
        this.genreDropped = false;
      }
  }

  //search animes when user click on filter button
  SearchAnimesByFilter(form: NgForm)
  {
    var apiCall = this.apiStringBase;

    //fill call with genres if any in table
    apiCall = this.GenreConstuctFilterCall(apiCall);

    //fill call with producers if any in table
    apiCall = this.ProducerConstuctFilterCall(apiCall);

    //fill call whith year if not null
    apiCall = this.YearSeasonConstuctFilterCall(apiCall);

    //fill call whith status if not null
    apiCall = this.StatusConstuctFilterCall(apiCall);

    //fill call whith status if not null
    apiCall = this.SortConstuctFilterCall(apiCall);

    this.api.getAnimesSearchByFilter(apiCall).subscribe(data =>{
      this.animes=data.data;
      console.log(this.animes);
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async callStartFunction()
  {
    this.getGenres();
  }

  submitForm(form: NgForm) 
  {
      this.sort = form.value.sort;
  }

  GenreConstuctFilterCall(apiCall : string)
  {
    if(this.genres.length>0)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="genres="
      }


      for(let i=0; i<this.genres.length; i++)
      {
        if(this.genres[i].isActive === true){
          apiCall+=this.genres[i].mal_id+",";
        }
      }
    }

    return apiCall;
  }

  ProducerConstuctFilterCall(apiCall : string)
  {
    if(this.producers.length>0)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="producers="
      }
      else
      {
        apiCall+="&producers="
      }


      for(let i=0; i<this.producers.length; i++)
      {
        if(this.producers[i].isActive === true){
          apiCall+=this.producers[i].mal_id+",";
        }
      }
    }

    return apiCall;
  }

  YearSeasonConstuctFilterCall(apiCall: string)
  {
    if(this.startDate === undefined || this.startDate === null)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="start_date="
      }
      else
      {
        apiCall+="&start_date="
      }
      apiCall+=this.startDate.getFullYear();
    }

    if(this.endDate === undefined || this.endDate === null)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="end_date="
      }
      else
      {
        apiCall+="&end_date="
      }
      apiCall+=this.startDate.getFullYear();
    }

    return apiCall;
  }

  StatusConstuctFilterCall(apiCall: string)
  {
    if(this.status !== undefined)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="status="
      }
      else
      {
        apiCall+="&status="
      }

      apiCall+= this.status;
    }

    return apiCall;
  }

  SortConstuctFilterCall(apiCall: string)
  {
    if(this.sort !== undefined)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="order_by="
      }
      else
      {
        apiCall+="&order_by="
      }

      apiCall+= this.sort;
    }

    return apiCall;
  }

  CallSeason()
  {
    if(this.seasons !== undefined)
    {
      if(this.seasonyear === undefined){
        this.seasonyear = new Date().getFullYear();
      }

      

    }

  }


}
