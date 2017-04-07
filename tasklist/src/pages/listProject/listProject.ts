import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ListTask } from '../listTask/listTask';
import { ListNotification } from '../listNotification/listNotification';
import { ModalAddProject } from '../modalAddProject/modalAddProject';
import {ProjectService} from '../../services/projectService';
import { Project } from '../../models/projectModel';

@Component({
  selector: 'list-project',
  templateUrl: 'listProject.html',
  providers: [ProjectService]
})

export class ListProject {
  items: Array<Project>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private projectService: ProjectService
  )
  {
    this.items = [];
    this.getDataFromApi();
  }

  ionViewWillEnter() {
    this.getDataFromApi();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListTask, {
      project: item
    });
  }

  notificationTapped() {
    this.navCtrl.push(ListNotification);
  }

  deleteProject(item) {
    let title = item.name;

    this.projectService.deleteProject(item.id).subscribe(
      response => {
        let toast = this.toastCtrl.create({
          message: title + ' has been deleted',
          duration: 3000
        });
        toast.present();

        // Refresh project list
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

  openModal() {
    let modal = this.modalCtrl.create(ModalAddProject);
    modal.onDidDismiss(() => {
      this.getDataFromApi();
    });
    modal.present();
  }

  getDataFromApi() {
    this.projectService.listProjects().subscribe(
      response => {
        this.items = response.json().map(p => new Project(p) );
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
