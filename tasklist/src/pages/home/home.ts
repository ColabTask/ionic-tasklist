import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController) {

  }

  itemTapped(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Login, {
    });
  }
}
