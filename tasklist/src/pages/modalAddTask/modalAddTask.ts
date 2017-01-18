import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'modalAddTask.html'
})

export class ModalAddTask {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
