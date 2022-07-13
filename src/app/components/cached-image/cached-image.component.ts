import { Component, Input, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


const CACHED_FOLDER = "DATA";


@Component({
  selector: 'app-cached-image',
  templateUrl: './cached-image.component.html',
  styleUrls: ['./cached-image.component.scss'],
})
export class CachedImageComponent implements OnInit {

  _src: string = '';
  @Input() spinner = false;


  @Input()
  set src(imageUrl: string) {
    console.log(`SET SOURCE :- ${imageUrl}`);
    const imageName = imageUrl.split('/').pop();
    const fileType = imageUrl.split('.').pop();
    console.log(`ImageName :- ${imageName}`);
    console.log(`Image Type :- ${fileType}`);
    console.log( `PATH Of STORAGE:- /${CACHED_FOLDER}/${imageName}`);
    
    Filesystem.readFile({
      directory: Directory.Data,
      path: `/${CACHED_FOLDER}/${imageName}`
    }).then((readFile) =>{
      console.log(`LOCAL FILE :- ${readFile}`);
      this._src = `data:image/${fileType};base64,${readFile.data}`;
      
    }).catch(async (error) =>{
      console.log(`File Error :- ${error}`);
      
      //write the file to disk
      await this.storeImage(imageUrl, `/${CACHED_FOLDER}/${imageName}`);
      Filesystem.readFile({
        directory: Directory.Data,
        path: `/${CACHED_FOLDER}/${imageName}`
      }).then((readFile) =>{
      this._src = `data:image/${fileType};base64,${readFile.data}`;
      console.log(`STORED FILE :- ${readFile}`);

        
        
      }).catch((error) =>{
        console.log(`Error After Storing Image ${error}`);
        
      })
    })
  }


  constructor() { }

  ngOnInit() {}

  async storeImage(url ,path){
    const response = await fetch(url);
// convert to a Blob
const blob = await response.blob();
// convert to base64 data, which the Filesystem plugin requires
const base64Data = await this.convertBlobToBase64(blob) as string;
       
const savedFile = await Filesystem.writeFile({
  path: path,
  data: base64Data,
  directory: Directory.Data
});
console.log(`SAVED FILE: - ${savedFile.uri}`);


return savedFile;
  }

  convertBlobToBase64(blob: Blob){
    // if (request.response instanceof Blob) {
    //   const realFileReader = (reader as any)._realReader;
    //   if (realFileReader) {
    //     reader = realFileReader;
    //   }
    // }
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
   reader.readAsDataURL(blob);
    })
  }
}
