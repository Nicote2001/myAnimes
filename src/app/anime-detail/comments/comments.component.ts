import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonErrorComponent } from 'src/app/errors/common-error/common-error.component';
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
  modalRef: MdbModalRef<CommonErrorComponent> | null = null;
  isDroppedComment: boolean = false;


  constructor(private commentService:CommentsService,  private modalService: MdbModalService) { }

  ngOnInit(): void {
  }

  async GetCommentaire()
  {
    this.commentTabs = await this.commentService.getCommentsByAnimeId(this.animeId);
  }

  PostComment()
  {
    if(localStorage.getItem('username') != null || localStorage.getItem('username') != undefined){
      this.commentService.addComment(new IComment("",this.animeId,localStorage.getItem('username'),new Date().toString(),this.comment));
      this.GetCommentaire();
    }
    else
    {
      this.openModalError();
    }
  }

  openModalError()
  {
    this.modalRef = this.modalService.open(CommonErrorComponent, {
      modalClass: 'modal-dialog-centered modal-lg',
      data: { message: 'You need to be logged to comment !',
              isSucess: false
            }
    });
  }

  dropComment()
  {
    this.isDroppedComment = true;
    this.GetCommentaire();
  }

}
