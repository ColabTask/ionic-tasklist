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
  selector: 'list-task',
  templateUrl: 'listTask.html',
  providers: [TaskService]
})
export class ListTask {
  items: Array<Task>;
  project: Project;
  searchId: string = '';
  searchName: string = '';
  searchDone: string = 'all';
  searchPriority: string = 'all';
  searchAssigned: string = '';
  showFilter: boolean = false;
  isPriorityFiltered: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private taskService: TaskService,
    public toastCtrl: ToastController
  ) {
    this.project = new Project(navParams.get("project"));
    this.getDataFromApi();
  }

  ionViewWillEnter() {
    this.getDataFromApi();
  }

  getDataFromApi(){
    this.taskService.getTasksByProject(this.project.id).subscribe(
      response => {
        this.items = response.json().map(t => new Task(t)).filter((item) => {
          if (this.searchPriority != "all") {
            if (item.priority != this.searchPriority) {
              return false;
            }
          }
          if (this.searchDone == "done" && item.done != true) {
            return false;
          }
          else if (this.searchDone == "notDone" && item.done != false) {
            return false;
          }
          if (this.searchId != "")
          {
            if(item.id != this.searchId)
            {
              return false;
            }
          }
          if (this.searchAssigned != "")
          {
            if(item.assigned.username.toLowerCase().indexOf(this.searchAssigned.toLowerCase()) == -1)
            {
              return false;
            }
          }
          return item.name.toLowerCase().indexOf(this.searchName.toLowerCase()) > -1;
        });
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
