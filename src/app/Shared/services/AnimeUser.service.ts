import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AnimeUser } from 'src/app/objects/animeUser';


@Injectable({
  providedIn: 'root'
})
export class AnimeUserService {


  constructor(private afs : AngularFirestore) { }


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

  getAnimeByUidAndId(animeid:string)
  {
    return new Promise<any>((resolve)=> {
      this.afs.collection('AnimeUsers', ref => ref.where('uid', '==', localStorage.getItem('uid')).where('animeId', '==', animeid)).valueChanges({ idField: 'id' }).subscribe(item => resolve(item))
      })
  }

  async updateSave(item:AnimeUser)
  {
    var animeUserExist = await this.getAnimeByUidAndId(item.animeId);
    console.log(animeUserExist);
    if(animeUserExist.length>0)
    {
      this.afs.doc(`AnimeUsers/`+animeUserExist[0].id).update({currentEpisode:item.currentEpisode});
    }
    else
    {
      this.addSave(item);
    }
  }
  
    
}