import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { from, Observable, of, } from 'rxjs';
import { CatchingService } from './catching.service';
import { delay, switchMap, tap, map } from 'rxjs/operators';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  connected = true;
  constructor(private http: HttpClient,
    private toastController: ToastController, private cachingService: CatchingService) {
    Network.addListener("networkStatusChange",(status) =>{
      this.connected = status.connected;
    })

    this.toastController.create({animated: false}).then((t) => {t.present(); t.dismiss()});
  }


  getUsers(forceRefresh) {
    const url = "https://randomuser.me/api?results=10";
    return this.getData(url, forceRefresh).pipe(
      map((response: any) => response['results'])
    )

  }

  private getData(url, forceRefresh): Observable<any> {

    if(!this.connected){
    
        this.toastController.create({
          message: 'Your are viewing Offline data.',
          duration: 2000
        }).then((toast) => {
          toast.present();

        })
      
      return from(this.cachingService.getCachedRequest(url));
    }
    if (forceRefresh) {
      return this.callAndCache(url);
    } else {
      const storedValue = from(this.cachingService.getCachedRequest(url));
      return storedValue.pipe(
        switchMap(result => {

          if (!result) {
            return this.callAndCache(url);
          } else {
            return of(result);

          }
        })
      )
    }

  }


  private callAndCache(url): Observable<any>{
    return this.http.get(url).pipe(
      delay(2000), //testing
      tap(res =>{
        this.cachingService.cacheRequest(url, res);
      })
    )
  }

}
