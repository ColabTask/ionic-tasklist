import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ListTask } from '../listTask/listTask';
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
  searchTerm: string = '';
  searchId: string = '';

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

  deleteProject(item) {
    let title = item.title;

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
        this.items = response.json().map(p => new Project(p) ).filter((item) => {
          if (this.searchId != "")
          {
            if(item.id != this.searchId)
            {
              return false;
            }
          }
          return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });;
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
