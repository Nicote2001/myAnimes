import { Component, OnInit } from '@angular/core';
import { faAngleDown, faRankingStar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FilterAnimeApiCallerService } from 'src/app/ApiCallerService/filterAnime.api-caller.service';
import { IAnime } from 'src/app/objects/anime.model';
import { Filter } from 'src/app/objects/filter.model';
import { NgForm } from '@angular/forms';

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

  seasons : Filter[]= [new Filter(0,"winter",false),new Filter(0,"spring",false),new Filter(0,"summer",false),new Filter(0,"fall",false)];
  seasonDropped : boolean;

  years : Filter[]= [];
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

  SearchAnimesByFilter(form: NgForm)
  {
    var apiCall = this.apiStringBase;

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
    this.getLastYears();
  }

  getLastYears()
  {
    var currentYear = new Date().getFullYear();

    for(let i=currentYear; i>currentYear-21 ; i--)
      {
          this.years.push(new Filter(0,i.toString(),false,i));
      }
  }

  submitForm(form: NgForm) 
  {
      this.sort = form.value.sort;
  }


}
