import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { ListProject } from '../listProject/listProject';
import {AuthenticationService} from '../../services/authenticationService';
import {SocketService} from '../../services/socketService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationService,SocketService]
})
export class Login {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    private authenticationService: AuthenticationService,
    private socketService: SocketService,
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
              this.storage.set('token', data.token);
              this.storage.set('userid', data.id);
              this.navCtrl.setRoot(ListProject, { });

              // When a user is authenticated start the connection to the socket server
              this.socketService.connect(data.token, data.id).then(() => {
                // Subscribe to the main channel: task
                this.socketService.subscribe('task').then((stream:any) => {
                  console.log(stream);
					stream.subscribe(data => {
					  // Toast notification
					  let toast = this.toastCtrl.create({
						message: "You have a new assgined task: " + data.title,
						dismissOnPageChange: true
					  });
					  toast.present();
					})
                })
              });
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
        this.storage.set('userid', data.id);
        this.navCtrl.setRoot(ListProject, { });

        // When a user is authenticated start the connection to the socket server
        this.socketService.connect(data.token, data.id).then(() => {
          // Subscribe to the main channel: task
          this.socketService.subscribe('task').then((stream:any) => {
            console.log(stream);
            stream.subscribe(data => {
              // Toast notification
              let toast = this.toastCtrl.create({
                message: "You have a new assgined task: " + data.title,
                dismissOnPageChange: true
              });
              toast.present();
            })
          })
        });
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
