import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
const TTL = 50;
const CACHEKEY = '_cache_';


@Injectable({
  providedIn: 'root'
})
export class CatchingService {

  constructor(private storage: Storage) { }

  public async initStorage(){
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }

  async cacheRequest(url, data){
    const validUntil = (new Date().getTime()) + TTL * 1000;
    url = `${CACHEKEY}/${url}`;
    return this.storage.set(url, {validUntil, data});
  }

  async getCachedRequest(url){
    const currentTime = (new Date().getTime());
    url = `${CACHEKEY}/${url}`;

    const storedValue = await this.storage.get(url);
    if(!storedValue){
      return null;
    }

    else if(storedValue.validUntil < currentTime){
      await this.storage.remove(url);
      return null;
    }

    else{
      return storedValue.data;
    }


  }


  async clearCachedData(){
    const keys = await this.storage.keys();

    keys.map(async key =>{
      if(key.startsWith(CACHEKEY)){
        await this.storage.remove(key)
      }
    })
  }


  async invalidateCacheEntry(url){
    url = `${CACHEKEY}/${url}`;
    await this.storage.remove(url);
  }
}
