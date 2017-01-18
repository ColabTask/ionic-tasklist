import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { ListProject } from '../listProject/listProject';
import {AuthenticationService} from '../../services/authenticationService';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationService]
})
export class Login {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    private authenticationService: AuthenticationService,
    public toastCtrl: ToastController
  ) { }

  authenticate() {
    this.authenticationService.authenticate(this.username, this.password).subscribe(
      data => {
        // Redirect after control
        this.navCtrl.setRoot(ListProject, { });
      },
      err => {
        let toast = this.toastCtrl.create({
          message: err,
          dismissOnPageChange: true
        });
        toast.present();
      }
    );
  }
}
