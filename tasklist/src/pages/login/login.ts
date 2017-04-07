import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { ListProject } from '../listProject/listProject';
import {AuthenticationService} from '../../services/authenticationService';
import { Storage } from '@ionic/storage';

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
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    storage.ready().then(() => {
      this.storage.get('username').then((username) => {
        this.username = username;

        this.storage.get('password').then((password) => {
          this.password = password;

          this.authenticationService.authenticate(this.username, this.password).subscribe(
            data => {
              this.storage.set('token', data.token)
              this.navCtrl.setRoot(ListProject, { });
            }
          );
        });
      });
    });
  }

  authenticate() {
    this.authenticationService.authenticate(this.username, this.password).subscribe(
      data => {
        // Redirect after control
        this.storage.set('username', this.username);
        this.storage.set('password', this.password);
        this.storage.set('token', data.token);
        this.navCtrl.setRoot(ListProject, { });
      },
      err => {
        let toast = this.toastCtrl.create({
          message: "Connection fail! Please verify your username and password.",
          dismissOnPageChange: true
        });
        toast.present();
      }
    );
  }
}
