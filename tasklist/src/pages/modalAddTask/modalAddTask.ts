import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {TaskService} from '../../services/taskService';
import {UserService} from '../../services/userService';
import {ProjectService} from '../../services/projectService';
import {Access} from '../../models/accessModel';
import {User} from '../../models/userModel';
import {Project} from '../../models/projectModel';

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
