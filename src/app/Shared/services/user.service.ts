import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { updateCurrentUser } from 'firebase/auth';
import { IUser } from 'src/app/objects/DataBaseObject/user.model';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs : AngularFirestore, private commonService: CommonService) { }


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

  getUserByUidAndGetId(uid : string) 
  {
    return new Promise<any>((resolve)=> {
      this.afs.collection('Users', ref => ref.where('uid', '==', uid)).valueChanges({ idField: 'id' }).subscribe(users => resolve(users))
      })
  }

  async updateUsername(username:string, id:string)
  {
    var item = await this.getUserByUidAndGetId(id);
    await this.afs.doc('Users/'+item[0].id).update({username: username});
    localStorage.setItem('username', username);
    this.commonService.openErrorComponent("SUCESS ! Your username will be change on your next login !",true)
  }
}

