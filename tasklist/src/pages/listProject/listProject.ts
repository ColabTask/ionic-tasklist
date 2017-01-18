import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ListTask } from '../listTask/listTask';
import { ModalAddProject } from '../modalAddProject/modalAddProject';
import {ProjectService} from '../../services/projectService';

@Component({
  selector: 'list-project',
  templateUrl: 'listProject.html',
  providers: [ProjectService]
})

export class ListProject {
  items: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private projectService: ProjectService
  )
  {
    this.getDataFromApi();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListTask, {
      project: item
    });
  }

  deleteProject(event, item) {
    let toast = this.toastCtrl.create({
      message: item.title + ' has been deleted',
      duration: 3000
    });
    toast.present();
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalAddProject);
    modal.onDidDismiss(() => {
      this.getDataFromApi();
    });
    modal.present();
  }

  getDataFromApi() {
    this.projectService.listProjects().subscribe(
      data => {
        this.items = data;
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
}
