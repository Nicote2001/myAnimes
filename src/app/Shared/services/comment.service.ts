import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { IComment } from 'src/app/objects/DataBaseObject/comment.model';
import { IUser } from 'src/app/objects/DataBaseObject/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add user
  addComment(comment:IComment) {
    comment.id = this.afs.createId();
    let Record = {}
    Record['id'] = comment.id;
    Record['animeId'] = comment.animeId;
    Record['username'] = comment.username;
    Record['date'] = comment.date;
    Record['comment'] = comment.comment;
    return this.afs.collection('Comments').add(Record);
  }
  
    
}