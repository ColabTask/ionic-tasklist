import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ListProject } from '../pages/listProject/listProject';
import { ListTask, PopOverPage } from '../pages/listTask/listTask';
import { ListNotification } from '../pages/listNotification/listNotification';
import { ModalAddProject } from '../pages/modalAddProject/modalAddProject';
import { ModalAddTask } from '../pages/modalAddTask/modalAddTask';
import { Login } from '../pages/login/login';
import { DetailTask, DetailTaskPopover } from '../pages/detailTask/detailTask';
import { MyTask } from '../pages/myTask/myTask';
import { Storage } from '@ionic/storage';
import { Config } from '../config/config';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ListProject,
    ListTask,
    ModalAddProject,
    Login,
    DetailTask,
    ModalAddTask,
    PopOverPage,
	  MyTask,
    ListNotification,
    DetailTaskPopover
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      hostApi: 'http://localhost:8000/api/v1'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ListProject,
    ListTask,
    ModalAddProject,
    Login,
    DetailTask,
    ModalAddTask,
    PopOverPage,
	  MyTask,
    ListNotification,
    DetailTaskPopover
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Storage,
    Config
  ]
})
export class AppModule {}
