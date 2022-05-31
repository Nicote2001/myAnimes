import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { updateCurrentUser } from 'firebase/auth';
import { IUser } from 'src/app/objects/DataBaseObject/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add user
  addUser(user : IUser) {
    user.id = this.afs.createId();
    let Record = {}
    Record['id'] = user.id;
    Record['username'] = user.username;
    Record['uid'] = user.uid
    return this.afs.collection('Users').add(Record);
  }

  getUserByUid(uid : string) 
  {
    return new Promise<any>((resolve)=> {
      this.afs.collection('Users', ref => ref.where('uid', '==', uid)).valueChanges().subscribe(users => resolve(users))
      })
  }

  updateUsername(username:string, id:string)
  {
    this.afs.doc('User/${id}').update({username :username});
  }
}

