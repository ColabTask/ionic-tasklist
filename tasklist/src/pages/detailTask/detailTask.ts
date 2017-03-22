import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import {TaskService} from '../../services/taskService';

@Component({
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
    private taskService: TaskService
  )
  {
    this.task = navParams.get("task");
  }

  closeTask() {
    this.taskService.closeTask(this.task.id).subscribe(
      response => {
        let toast = this.toastCtrl.create({
          message: this.task.name + ' has been closed',
          duration: 3000
        });
        toast.present();
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

  openTask() {
    this.taskService.openTask(this.task.id).subscribe(
      response => {
        let toast = this.toastCtrl.create({
          message: this.task.name + ' has been opened',
          duration: 3000
        });
        toast.present();
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

  getDataFromApi() {
    this.taskService.getTask(this.task.id).subscribe(
      response => {
        this.task = response.json()
      }
    );
  }
}
