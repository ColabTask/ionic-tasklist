import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';

import { TaskService } from '../../services/taskService';
import { ProjectService } from '../../services/projectService';
import { ModalAddTask } from '../modalAddTask/modalAddTask';
import { Task } from '../../models/taskModel';
import { Label } from '../../models/labelModel';
import { Project } from '../../models/projectModel';

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
    this.task = new Task(navParams.get("task"));
    this.project = new Project(this.task.project||{});
  }

}

@Component({
  selector: 'detail-task',
  templateUrl: 'detailTask.html',
  providers: [
    TaskService,
    ProjectService
  ]
})
export class DetailTask {
  task: Task;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    private taskService: TaskService,
    private projectService: ProjectService
  )
  {
    this.task = new Task(navParams.get("task"));
    let labels = this.task.labels;
    this.task.labels = [];
    for(let label of labels) {
        this.projectService.getLabel(label).subscribe(
            response => {
                this.task.labels.push(response.json());
            }
        )
    }
    console.log(this.task);
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DetailTaskPopover, { task: this.task });
    popover.present({
      ev: event
    });
  }

  editTapped(event) {
	// Create a copy of the related attribute
	const taskCpy = new Task(this.task.getProperties());
	const projectCpy = new Project(this.task.project.getProperties());
  taskCpy.project = projectCpy;
	let modal = this.modalCtrl.create(ModalAddTask, { task: taskCpy, project: projectCpy });
    modal.present();
    modal.onDidDismiss(() => {
      this.getDataFromApi();
    });
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
        this.task = new Task(response.json());
        let labels = this.task.labels;
        this.task.labels = [];
        for(let label of labels) {
            this.projectService.getLabel(label).subscribe(
                response => {
                    this.task.labels.push(response.json());
                }
            )
        }
      }
    );
  }

}
