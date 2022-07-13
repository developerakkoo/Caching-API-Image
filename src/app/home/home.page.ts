import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { delay, switchMap, tap, finalize } from 'rxjs/operators';
import { CatchingService } from '../services/catching.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  connected = true;
  user = null;

  constructor(private apiService: ApiService,
              private cachingService: CatchingService,
              private loadingCtrl: LoadingController) {
                Network.addListener("networkStatusChange",(status) =>{
                  this.connected = status.connected;
                })
              }



              async refreshUsers(event?){
                const loading = await this.loadingCtrl.create({
                  message: 'Loading users...'
                })
                await loading.present();

                const refresh = event  ? true: false;

                this.apiService.getUsers(refresh).pipe(
                  finalize(() =>{
                    if(event) {
                      event.target.complete();
                    }

                    loading.dismiss();
                  })
                ).subscribe((res) =>{
                  console.log(`res: ${JSON.stringify(res)}`);
                  
                  this.user = res;
                })
              }


              async clearCache(){
                this.cachingService.clearCachedData();
              }

}
