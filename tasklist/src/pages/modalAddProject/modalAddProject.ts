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
    this.project = new Project();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    console.log(this.project);
    this.projectService.createProject(this.project).subscribe(
      response => {
        console.log(response);
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('Project Creation Complete')
    );
  }
}
