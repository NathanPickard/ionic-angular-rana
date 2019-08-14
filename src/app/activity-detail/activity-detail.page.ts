import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Activity } from '../types';
import { ActivityService } from '../activity.service';
import { ActivityVideoPage } from '../activity-video/activity-video.page';

import { ModalController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  activityDetail: Observable<Activity>;

  constructor(
    private _toastController: ToastController,
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private _socialShare: SocialSharing,
    private _modalController: ModalController,
    activityService: ActivityService,
    activatedRoute: ActivatedRoute) {
    const activityID = activatedRoute.snapshot.params['activityID'];
    this.activityDetail = activityService.getActivity(activityID);
  }

  ngOnInit() {
  }

  share() {
    this.activityDetail.subscribe((activity) => {
      this._socialShare.share('Look what I found on this app called Rana', activity.name, '', activity.cropped);
    });
  }

  async openModal() {
    const videoModal = await this._modalController.create({
      component: ActivityVideoPage
    });

    return await this.activityDetail.subscribe((activity) => {
      videoModal.componentProps = {
        videoURL: activity.video_url
      };
      return videoModal.present();
    });
  }

  addToFavorites() {
    this.activityDetail.subscribe(
      (activity) => {
        this._angularFireStore
          .collection('favorites')
          .doc(this._angularFireAuth.auth.currentUser.uid)
          .collection('favorites', (ref) => {
            return ref.where('id', '==', activity.id)
          })
          .get()
          .subscribe((doc) => {
            if (doc.empty) {
              this._angularFireStore
                .collection('favorites')
                .doc(this._angularFireAuth.auth.currentUser.uid)
                .collection('favorites')
                .add(activity)
                .then(() => {
                  const toast = this._toastController.create({
                    message: 'The Activity ' +
                      activity.name + ' was added to your favorites',
                    duration: 3500,
                    position: 'top'
                  });
                  toast.then((toastMessage) => {
                    toastMessage.present();
                  });
                });
            }
          });
      }
    );
  }

}
