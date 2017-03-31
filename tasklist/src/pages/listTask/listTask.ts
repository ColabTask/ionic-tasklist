import { Component } from '@angular/core';

import { PopoverController, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { DetailTask } from '../detailTask/detailTask';
import { ModalAddTask } from '../modalAddTask/modalAddTask';
import { ModalAddProject } from '../modalAddProject/modalAddProject';
import {TaskService} from '../../services/taskService';
import {ProjectService} from '../../services/projectService';
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
  selector: 'list-task',
  templateUrl: 'listTask.html',
  providers: [ProjectService, TaskService]
})
export class ListTask {
  items: Array<Task>;
  project: Project;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private projectService: ProjectService,
    private taskService: TaskService,
    public toastCtrl: ToastController
  ) {
    this.items = [];
    this.project = new Project(navParams.get("project"));
    this.getDataFromApi();
  }

  ionViewWillEnter() {
    this.getDataFromApi();
  }

  getDataFromApi(){
    this.projectService.getProject(this.project.id).subscribe(
      response => {
        this.project = new Project(response.json());
      }
    );
    this.taskService.getTasksByProject(this.project.id).subscribe(
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

  editTapped(event) {
    // Create a copy of the related attribute
    const projectCpy = new Project(this.project.getProperties());
    let modal = this.modalCtrl.create(ModalAddProject, { project: projectCpy });
    modal.present();
    modal.onDidDismiss(() => {
      this.getDataFromApi();
    });
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
