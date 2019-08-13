import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myProfileImage;
  myStoredProfileImage: Observable<any>;

  constructor(
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private _alertControllers: AlertController,
    private _camera: Camera) {
    this.myStoredProfileImage = _angularFireStore
      .collection('users')
      .doc(this._angularFireAuth.auth.currentUser.uid)
      .valueChanges();
  }

  async selectImageSource() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    };

    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    const alert = await this._alertControllers.create({
      header: 'Select Source',
      message: 'Pick a source for your image',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this._camera.getPicture(cameraOptions)
              .then((imageData) => {
                // this.myProfileImage = 'data:image/jpeg;base64,' + imageData;
                const image = 'data:image/jpeg;base64,' + imageData;
                this._angularFireStore
                  .collection('users')
                  .doc(this._angularFireAuth.auth.currentUser.uid)
                  .set({
                    image_src: image
                  });
              });
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this._camera.getPicture(galleryOptions)
              .then((imageData) => {
                // this.myProfileImage = 'data:image/jpeg;base64,' + imageData;
                const image = 'data:image/jpeg;base64,' + imageData;
                this._angularFireStore
                  .collection('users')
                  .doc(this._angularFireAuth.auth.currentUser.uid)
                  .set({
                    image_src: image
                  });
              });
          }
        }
      ]
    });

    await alert.present();
  }

}
