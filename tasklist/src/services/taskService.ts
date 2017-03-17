import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';


@Injectable()
export class TaskService {
  serverURL = 'http://198.27.119.182/api/v1';
  propertiesURL = this.serverURL + '/tasks';

  constructor (protected http:Http) {
  }

  buildOptions(params){
    let headers = new Headers();
    let storage = new Storage();

    return storage.get("token").then(
      (token) => {
        headers.append('Authorization', 'Token ' + token);
        let options;
        if(params){
          options = new RequestOptions({ headers: headers, search: params });
        }
        else {
          options = new RequestOptions({ headers: headers });
        }
        return options;
      }
    )
  }

  listTasks() {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.get(this.propertiesURL, options));
  }

  createTask(task, project) {
    console.log("==> Create task");
    let data = new URLSearchParams();
    data.append('name', task.name);
    data.append('project_id', project.id);

    if(task.description){
      data.append('description', task.description);
    }

    if(task.assigned){
      data.append('assigned_id', task.assigned);
    }

    if(task.priority){
      data.append('priority', task.priority);
    }

    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.post(this.propertiesURL, data, options));
  }

  getTasksByAssigned(id){
    let params = new URLSearchParams();
    params.set('assigned__id', id);

    return Observable
        .fromPromise(this.buildOptions(params))
        .switchMap((options) => this.http.get(this.propertiesURL, options));
  }

  getTasksByProject(id) {
    let params = new URLSearchParams();
    params.set('project__id', id);

    return Observable
        .fromPromise(this.buildOptions(params))
        .switchMap((options) => this.http.get(this.propertiesURL, options));
  }

  getTasksByEndDate(endDate) {
    let params = new URLSearchParams();
    params.set('end_date', endDate);

    return Observable
        .fromPromise(this.buildOptions(params))
        .switchMap((options) => this.http.get(this.propertiesURL, options));
  }
}
