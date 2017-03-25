import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {TaskService} from '../../services/taskService';
import {UserService} from '../../services/userService';
import {ProjectService} from '../../services/projectService';
import {Access} from '../../models/accessModel';
import {User} from '../../models/userModel';
import {Project} from '../../models/projectModel';
import {Task} from '../../models/taskModel';

@Component({
  templateUrl: 'modalAddTask.html',
  providers: [
    TaskService,
    ProjectService,
    UserService
  ]
})

export class ModalAddTask {
  task:Task;
  accessList: Array<Access>;
  project: Project;
  users: Array<User>;
  projects: Array<Project>;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService
  )
  {
    // Get the project given in params (optionnal params)
    this.project = params.get('project');
    if(this.project)
    {
      // We populate the list of user
      this.populateListUser();
    }

    const task = params.get('task');
    if(task) {
      this.task = new Task(task);
      this.populateTask();
    } else {
      this.task = new Task();
    }

    // Get list of project to populate select
    this.projectService.listProjects().subscribe(
      response => {
        this.projects = response.json()
        if(!this.project)
        {
          // If we don't have a selected project, we take the first one.
          this.project = this.projects[0];
          // And we populate the list of user
          this.populateListUser();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  populateListUser(){
    // Get list of people who have access to populate assigned select
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

  populateTask() {
    // Populate the interface with the task information
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    let handler;
    if( this.task['id'] != undefined ) {
      handler = this.editTask(this.task, this.project);
    } else {
      handler = this.createTask(this.task, this.project);
    }

    handler.subscribe(
      response => {
        console.log(response.json());
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err.json());
      },
      () => console.log('Task ' + this.task['id'] ? 'Edition' : 'Creation' + ' Complete')
    );
  }

  createTask(task, project) {
    console.log(task, project);
    return this.taskService.createTask(task, project);
  }

  editTask(task, project) {
    return this.taskService.editTask(task, project);
  }

  deleteTask() {

  }
}
