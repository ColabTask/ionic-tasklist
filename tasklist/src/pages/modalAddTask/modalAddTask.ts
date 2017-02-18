import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {TaskService} from '../../services/taskService';

@Component({
  templateUrl: 'modalAddTask.html',
  providers: [TaskService]
})

export class ModalAddTask {
  task = {};
  project: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private taskService: TaskService
  ) {
    this.project = params.get('project');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    console.log(this.task);
    this.taskService.createTask(this.task, this.project).subscribe(
      data => {
        console.log(data);
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('Task Creation Complete')
    );
  }
}
