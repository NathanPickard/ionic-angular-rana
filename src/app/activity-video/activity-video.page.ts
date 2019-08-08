import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
})
export class ActivityVideoPage implements OnInit {

  constructor(private _modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this._modalController.dismiss();
  }

}
