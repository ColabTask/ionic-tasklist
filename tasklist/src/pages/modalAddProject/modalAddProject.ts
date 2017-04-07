import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {ProjectService} from '../../services/projectService';
import {Project} from '../../models/projectModel';

@Component({
  templateUrl: 'modalAddProject.html',
  providers: [ProjectService]
})

export class ModalAddProject {
  project:Project;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private projectService: ProjectService
  ) {
    const project = params.get('project');
    if(project) {
      this.project = new Project(project);
    } else {
      this.project = new Project();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    let handler;
    if( this.project['id'] != undefined ) {
      handler = this.editProject(this.project);
    } else {
      handler = this.createProject(this.project);
    }

    handler.subscribe(
      response => {
        console.log(response.json());
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err.json());
      },
      () => console.log('Project ' + this.project['id'] ? 'Edition' : 'Creation' + ' Complete')
    );
  }

  createProject(project) {
    console.log(project);
    return this.projectService.createProject(project);
  }

  editProject(project) {
    return this.projectService.editProject(project);
  }
}
