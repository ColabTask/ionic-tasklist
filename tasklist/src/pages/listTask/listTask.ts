import { Component } from '@angular/core';

import { PopoverController, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { DetailTask } from '../detailTask/detailTask';
import { ModalAddTask } from '../modalAddTask/modalAddTask';
import {TaskService} from '../../services/taskService';


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
  selector: 'list-task',
  templateUrl: 'listTask.html',
  providers: [TaskService]
})
export class ListTask {
  items: Array<any>;
  project: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private taskService: TaskService,
    public toastCtrl: ToastController
  ) {
    this.project = navParams.get("project");
    this.getDataFromApi();
  }

  getDataFromApi(){
    this.taskService.getTasksByProject(this.project.id).subscribe(
      response => {
        this.items = response.json()
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

  closeTask(item) {
    this.taskService.closeTask(item.id).subscribe(
      response => {
        let toast = this.toastCtrl.create({
          message: item.name + ' has been closed',
          duration: 3000
        });
        toast.present();

        // Refresh project list
        this.getDataFromApi();
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

  openTask(item) {
    this.taskService.openTask(item.id).subscribe(
      response => {
        let toast = this.toastCtrl.create({
          message: item.name + ' has been opened',
          duration: 3000
        });
        toast.present();

        // Refresh project list
        this.getDataFromApi();
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

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopOverPage);
    popover.present({
      ev: event
    });
  }

  createTask() {
    let modal = this.modalCtrl.create(ModalAddTask, { project: this.project });
    modal.onDidDismiss(() => {
      this.getDataFromApi();
    });
    modal.present();
  }
}
