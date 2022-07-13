import { Component } from '@angular/core';
import { CatchingService } from './services/catching.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private cachingService: CatchingService) {
    this.cachingService.initStorage();
    this.createCacheFolder();
  }

  async createCacheFolder(){
    await Filesystem.mkdir({
      directory: Directory.Cache,
      path: "_cacheImage"
    }).then((dir) =>{
      console.log(`Created Directory: ${dir}`);
      
    }).catch((err) =>{
      console.log(`Already Exists: ${err}`);
      
    })
  }
}
