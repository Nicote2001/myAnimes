import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IComment } from 'src/app/objects/DataBaseObject/comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs : AngularFirestore) { }


  // add user
  addComment(comment:IComment) {
    comment.id = this.afs.createId();
    let Record = {}
    Record['id'] = comment.id;
    Record['animeId'] = comment.animeId.toLowerCase();
    Record['username'] = comment.username;
    Record['date'] = comment.date;
    Record['comment'] = comment.comment;
    return this.afs.collection('Comments').add(Record);
  }

  getCommentsByAnimeId(animeId:string)
  {
    return new Promise<any>((resolve)=> {
      this.afs.collection('Comments', ref => ref.where('animeId', '==', animeId.toLocaleLowerCase())).valueChanges().subscribe(comments => resolve(comments))
      })
      
  }
  
    
}