import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {ProjectService} from '../../services/projectService';
import {Project} from '../../models/projectModel';

@Component({
  templateUrl: 'modalEditProject.html',
  providers: [ProjectService]
})

export class ModalEditProject {
  project:Project;

  //add projet in parameter and replace this.project
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private projectService: ProjectService
  ) {
    this.project = params.get('project');
  }

  setProject(item){
    this.project = item;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editForm() {
    console.log(this.project);
    this.projectService.editProject(this.project).subscribe(
      response => {
        console.log(response);
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('Project Modification Complete')
    );
  }
}
