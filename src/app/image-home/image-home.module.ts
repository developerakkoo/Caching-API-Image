import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageHomePageRoutingModule } from './image-home-routing.module';

import { ImageHomePage } from './image-home.page';
import { SharedComponentsFlatModule } from '../components/shared-components---flat/shared-components---flat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageHomePageRoutingModule,
    SharedComponentsFlatModule
  ],
  declarations: [ImageHomePage]
})
export class ImageHomePageModule {}
