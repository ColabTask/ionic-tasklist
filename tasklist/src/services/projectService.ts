import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProjectService {
  serverURL = 'http://198.27.119.182/api/v1';
  propertiesURL = this.serverURL + '/projects';

  constructor (protected http:Http) {}

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

  listProjects() {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.get(this.propertiesURL, options));
  }

  createProject(project) {
    let data = new URLSearchParams();
    data.append('name', project.name);
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.post(this.propertiesURL, data, options));
  }

  deleteProject(id) {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.delete(this.propertiesURL + "/" + id, options));
  }
}
