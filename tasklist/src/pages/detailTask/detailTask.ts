import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'detailTask.html'
})

export class DetailTask {
  task: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  )
  {
    this.task = navParams.get("task");
  }
}
