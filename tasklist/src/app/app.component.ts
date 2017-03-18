import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';
import { ListProject } from '../pages/listProject/listProject';
import { MyTask } from '../pages/myTask/myTask';
import { Config } from '../config/config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public configuration: Config) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My task', component: MyTask },
      { title: 'List projects', component: ListProject }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
		this.configuration.load().then(() => {
		  // Okay, so the platform is ready and our plugins are available.
		  // Here you can do any higher level native things you might need.
		  StatusBar.styleDefault();
		  Splashscreen.hide();
		});
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
