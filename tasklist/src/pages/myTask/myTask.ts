import { Component } from '@angular/core';

import { PopoverController, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { DetailTask } from '../detailTask/detailTask';
import { ModalAddTask } from '../modalAddTask/modalAddTask';
import {TaskService} from '../../services/taskService';
import {Task} from '../../models/taskModel';
import {Project} from '../../models/projectModel';

@Component({
  template: `
    <ion-list class="popover-page">
      <ion-item>
        <ion-label>Radio 1</ion-label>
        <ion-radio value="Times New Roman"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Radio 2</ion-label>
        <ion-radio value="Times New Roman"></ion-radio>
      </ion-item>
    </ion-list>
  `
})
export class PopOverPage {
  constructor(private navParams: NavParams) { }

}


@Component({
  selector: 'my-task',
  templateUrl: 'myTask.html',
  providers: [TaskService]
})
export class MyTask {
  items: Array<Task>;
  project: Project;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private taskService: TaskService,
    public toastCtrl: ToastController
  ) {
    this.project = new Project(navParams.get("project"));
    this.taskService.getTasksByAssigned(1).subscribe(
      response => {
        this.items = response.json().map(t => new Task(t));
      },
      err => {
        let toast = this.toastCtrl.create({
          message: 'Error : Connection server',
          dismissOnPageChange: true
        });
        toast.present();
      }
    );
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailTask, {
      task: item
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopOverPage);
    popover.present({
      ev: event
    });
  }

  createTask() {
    let modal = this.modalCtrl.create(ModalAddTask);
    modal.present();
  }
}
