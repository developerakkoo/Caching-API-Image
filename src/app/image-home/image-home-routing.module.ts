import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageHomePage } from './image-home.page';

const routes: Routes = [
  {
    path: '',
    component: ImageHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageHomePageRoutingModule {}
