import { Component } from '@angular/core';

import { Platform, ViewController, NavParams } from 'ionic-angular';
import {ProjectService} from '../../services/projectService';

@Component({
  templateUrl: 'modalAddProject.html',
  providers: [ProjectService]
})

export class ModalAddProject {
  project = {}

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private projectService: ProjectService
  ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    console.log(this.project);
    this.projectService.createProject(this.project).subscribe(
      data => {
        console.log(data);
        this.viewCtrl.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('Project Creation Complete')
    );
  }
}
