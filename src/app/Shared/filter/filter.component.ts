import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAngleDown, faRankingStar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FilterAnimeApiCallerService } from 'src/app/ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from 'src/app/objects/anime.model';
import { Filter } from 'src/app/objects/filter.model';
import { NgForm } from '@angular/forms';
import { runInThisContext } from 'vm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() isQuickFilter:boolean;
  @Output() apiCallChanged: EventEmitter<string> =   new EventEmitter();

  constructor(private api: FilterAnimeApiCallerService, private router:Router) { }

  readonly genreString:string ="genre";
  readonly producerString:string ="producer";
  readonly seasonString:string ="season";
  readonly yearString:string ="year";
  readonly statusString:string ="status";
  readonly sortString:string ="sort";
  readonly apiStringBase:string = "https://api.jikan.moe/v4/anime?"
  

  title:string;
  genres : Filter[] = [];
  genreDropped : boolean;
  
  producers : Filter[]= [];
  producerDropped : boolean;

  seasons : string;
  seasonyear : number;
  seasonDropped : boolean;

  startDate : string;
  endDate : string;
  yearDropped : boolean;

  faAngleDown = faAngleDown;
  faFilter = faFilter;

  animes : IAnime[] = [];

  sort:string;
  sortDropped: boolean;

  status:string;
  statusDropped: boolean;

  search:string;

  ngOnInit(): void {
    this.callStartFunction();
    this.genreDropped = false;
    if(this.isQuickFilter)
    {
      this.title="Quick Filter";
    }
    else
    {
      this.title="Full Filter";
    }
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

    this.fillItemByForm(form);

    var apiCall = this.apiStringBase;

    //fill call with genres if any in table
    apiCall = this.GenreConstuctFilterCall(apiCall);

    //fill call with producers if any in table
    apiCall = this.ProducerConstuctFilterCall(apiCall);

    //fill call whith year if not null
    apiCall = this.YearSeasonConstuctFilterCall(apiCall);

    //fill call whith status if not null
    apiCall = this.StatusConstuctFilterCall(apiCall);

    //fill call whith sort if not null
    apiCall = this.SortConstuctFilterCall(apiCall);

    //fill call whith searc if not null
    apiCall = this.SearchConstuctFilterCall(apiCall);

    //fill season if not null
    apiCall = this.CallSeason(apiCall);

    if(this.isQuickFilter)
    {
      this.router.navigateByUrl('anime/search',{state:{apiCall:apiCall}});
    }
    else{
      this.apiCallChanged.emit(apiCall);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async callStartFunction()
  {
    await this.delay(2000);
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
    if(this.startDate !== undefined)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="start_date="
      }
      else
      {
        apiCall+="&start_date="
      }
      apiCall+=this.startDate.slice(0,4);
    }

    if(this.endDate !== undefined)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="end_date="
      }
      else
      {
        apiCall+="&end_date="
      }
      apiCall+=this.endDate.slice(0,4);
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

  SearchConstuctFilterCall(apiCall: string)
  {
    if(this.search !== undefined)
    {
      if(apiCall === this.apiStringBase)
      {
        apiCall+="letter="
      }
      else
      {
        apiCall+="&letter="
      }

      apiCall+= this.search;
    }

    return apiCall;
  }

  CallSeason(apiCall:string)
  {
    if(this.seasons !== undefined || this.seasonyear !== undefined)
    {
      return 'https://api.jikan.moe/v4/seasons/'+this.seasonyear+'/'+this.seasons;
    }
    else{
      return apiCall;
    }
  }

  fillItemByForm(form:NgForm)
  {
    if(form.value.season !== undefined && form.value.season !== "")
    {
      this.seasons = form.value.season;
    }

    if(form.value.sort !== undefined && form.value.sort !== "")
    {
      this.sort = form.value.sort;
    }

    if(form.value.status !== undefined && form.value.status !== "")
    {
      this.status = form.value.status;
    }

    if(form.value.startDate !== undefined && form.value.startDate !== "")
    {
      this.startDate = form.value.startDate;
    }

    if(form.value.endDate !== undefined && form.value.endDate !== "")
    {
      this.endDate = form.value.endDate;
    }

    if(form.value.seasonYear !== undefined && form.value.seasonYear !== "")
    {
      this.seasonyear = form.value.seasonYear;
    }

    if(form.value.search !== undefined && form.value.search !== "")
    {
      this.search = form.value.search;
    }
  }


}
