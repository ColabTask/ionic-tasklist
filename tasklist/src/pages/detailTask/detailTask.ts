import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';

import { TaskService } from '../../services/taskService';
import { ModalAddTask } from '../modalAddTask/modalAddTask';

@Component({
  template: `
    <ion-list class="popover-page">
        <ion-item (click)="editTapped($event)">
        <p>Edit task</p>
      </ion-item>
    </ion-list>
  `
})
export class DetailTaskPopover {
  task: any;
  project: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.task = navParams.get("task");
    this.project = this.task.project||{};
  }

}

@Component({
  selector: 'detail-task',
  templateUrl: 'detailTask.html',
  providers: [TaskService]
})
export class DetailTask {
  task: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController
  )
  {
    this.task = navParams.get("task");
    console.log(this.task);
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DetailTaskPopover, { task: this.task });
    popover.present({
      ev: event
    });
  }

  editTapped(event) {
    let modal = this.modalCtrl.create(ModalAddTask, { task: this.task, project: this.task.project||{} });
    modal.present();
  }

}
