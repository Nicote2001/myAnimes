import { Component, OnInit } from '@angular/core';
import { faAngleDown, faRankingStar, faFilter } from '@fortawesome/free-solid-svg-icons';
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
  readonly producerString:string ="producer";
  readonly yearString:string ="year";
  readonly statusString:string ="status";
  readonly apiStringBase:string = "https://api.jikan.moe/v4/anime?"

  genres : Filter[] = [];
  genreDropped : boolean;
  
  producers : Filter[]= [];
  producerDropped : boolean;

  faAngleDown = faAngleDown;
  faFilter = faFilter;

  animes : IAnime[] = [];

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

  getGenres()
  {
    this.api.getGenre().subscribe(data =>{
      for(let i=0; i<19; i++)
      {
         this.genres.push(new Filter(data.data[i].mal_id,data.data[i].name,false));
      }
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
      else{}
      
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
    await this.delay(3000);
    this.getProducers();
  }


}
