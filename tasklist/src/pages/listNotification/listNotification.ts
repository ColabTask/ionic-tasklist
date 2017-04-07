import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { NotificationService } from "../../services/notificationService";

@Component({
  selector: 'list-notification',
  templateUrl: 'listNotification.html',
  providers: [NotificationService]
})
export class ListNotification {
  notifications: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private notificationService: NotificationService
  ) {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.notificationService.listNotifications().subscribe(
      response => {
        this.notifications = response.json()
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

  notificationTapped(event, notification) {
    // Mark notification as read or unread
    let handler;
    if( notification.is_read ) {
      handler = this.notificationService.markNotificationAsUnread(notification.id);
    } else {
      handler = this.notificationService.markNotificationAsRead(notification.id);
    }

    handler.subscribe(
      response => {
        let toast = this.toastCtrl.create({
          message: 'Notification "' + notification.title + '"' + (notification.is_read ? 'was marked as unread' : 'was mark as read'),
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

}
