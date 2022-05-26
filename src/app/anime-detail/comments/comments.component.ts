import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AnimeDetail } from 'src/app/objects/animeDetail.model';
import { IComment } from 'src/app/objects/DataBaseObject/comment.model';
import { CommentsService } from 'src/app/Shared/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() animeId : string ;
  comment : string = '';
  commentTabs: IComment[];

  constructor(private commentService:CommentsService) { }

  ngOnInit(): void {
    this.GetCommentaire();
  }

  async GetCommentaire()
  {
    this.commentTabs = await this.commentService.getCommentsByAnimeId(this.animeId);
  }

  PostComment()
  {
    this.commentService.addComment(new IComment("",this.animeId,localStorage.getItem('username'),new Date().toString(),this.comment));
    this.GetCommentaire();
  }

}
