import { Component, OnInit } from '@angular/core';
import { IComment } from 'src/app/objects/DataBaseObject/comment.model';
import { CommentsService } from 'src/app/Shared/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  anime : string = '';
  comment : string = '';
  animeId:string;

  constructor(private commentService:CommentsService) { }

  ngOnInit(): void {
  }

  GetCommentaire()
  {

  }

  PostComment()
  {
    this.commentService.addComment(new IComment("",this.animeId,localStorage.getItem('token'),new Date().toString(),this.comment))
  }

}
