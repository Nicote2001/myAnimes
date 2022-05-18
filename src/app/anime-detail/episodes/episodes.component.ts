import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Injectable, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { MdbTabsComponent } from 'mdb-angular-ui-kit/tabs';
import { totalmem } from 'os';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit,AfterViewInit {

  @Input() totalEpisodes: number;
  @Input() current: number;
  @Output() PageEmiter = new EventEmitter<number>();

  labelsEpisodes: LabelEpisode[] = [];
  Episodes: number[] =[];
  maximum = 100;
  lastActive = 0;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.calculateLabels(this.totalEpisodes);
  }

  

  //ne faire que si +100 episodes
  calculateLabels(totalEpisodes:number)
  {
    this.labelsEpisodes = [];
    
    var episodeSplit = Math.floor(totalEpisodes/100);
    var min = 1;
    var max = 100;

    for(let i=0; i < episodeSplit ; i++)
    {
      this.labelsEpisodes.push(new LabelEpisode(min,max,min+"-"+max,this.fillEpisodes(min,max)));
      min +=100;
      max+= 100;
    }

    var episodeLastPage = totalEpisodes - (episodeSplit*100);

    max = min+episodeLastPage-1;
      this.labelsEpisodes.push(new LabelEpisode(min,max,min+"-"+max,this.fillEpisodes(min,max)))
  }


  fillEpisodes(min:number, max:number)
  {
    var episodeNumbers: number[] =[];
    for(let j= min; j < max+1 ; j++)
    {
      episodeNumbers.push(j);
    }

    return episodeNumbers;
  }

  testclick(episode: number){
    this.PageEmiter.emit(episode)
  }

}


export class LabelEpisode
{

  constructor(  
    public min:number,
    public max:number,
    public label:string,
    public episodes:number[]){}
}

