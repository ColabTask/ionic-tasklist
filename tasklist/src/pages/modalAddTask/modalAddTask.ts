import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {TaskService} from '../../services/taskService';
import {UserService} from '../../services/userService';
import {ProjectService} from '../../services/projectService';
import {Access} from '../../models/accessModel';
import {User} from '../../models/userModel';

@Component({
  templateUrl: 'modalAddTask.html',
  providers: [
    TaskService,
    ProjectService,
    UserService
  ]
})

export class ModalAddTask {
  task = {};
  accessList: Array<Access>;
  project: any;
  users: Array<User>;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService
  )
  {
    this.project = params.get('project');
    this.users = [];
    this.projectService.listProjectUsers(this.project.id).subscribe(
      response => {
        this.accessList = response.json()
        for(let access of this.accessList){
          this.userService.getUser(access.user).subscribe(
            response => {
              this.users.push(response.json());
              console.log(response.json().id + " - " + response.json().username);
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    console.log(this.task);
    this.taskService.createTask(this.task, this.project).subscribe(
      response => {
        console.log(response.json());
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err.json());
      },
      () => console.log('Task Creation Complete')
    );
  }
}
