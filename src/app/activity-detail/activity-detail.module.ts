import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPage } from './activity-detail.page';
import { ActivityVideoPageModule } from '../activity-video/activity-video.module';

const routes: Routes = [
  {
    path: '',
    component: ActivityDetailPage
  }
];

@NgModule({
  imports: [
    ActivityVideoPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivityDetailPage]
})
export class ActivityDetailPageModule { }
