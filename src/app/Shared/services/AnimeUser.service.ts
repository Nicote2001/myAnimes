import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AnimeUser } from 'src/app/objects/animeUser';


@Injectable({
  providedIn: 'root'
})
export class AnimeUserService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add user
  addSave(item:AnimeUser) {
    item.id = this.afs.createId();
    let Record = {}
    Record['id'] = item.id;
    Record['animeId'] = item.animeId;
    Record['animeTitle'] = item.animeTitle;
    Record['imgUrl'] = item.imgUrl;
    Record['uid'] = item.uid;
    Record['currentEpisode'] = item.currentEpisode;
    Record['lastUpdate'] = item.lastUpdate;
    return this.afs.collection('AnimeUsers').add(Record);
  }

  getAnimeByUid()
  {
    return new Promise<any>((resolve)=> {
      this.afs.collection('AnimeUsers', ref => ref.where('uid', '==', localStorage.getItem('uid'))).valueChanges().subscribe(item => resolve(item))
      })
  }
  
    
}