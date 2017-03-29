import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { Config } from '../config/config';


@Injectable()
export class ProjectService {
  public serverURL:string;
  public propertiesURL:string;

	constructor (protected http:Http, private _config:Config) {
		this.serverURL = _config.get('apiUrl');
		this.propertiesURL = this.serverURL + '/projects';
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

  listProjects() {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.get(this.propertiesURL, options));
  }

  listProjectUsers(id) {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.get(this.propertiesURL + "/" + id + "/access", options));
  }

  getProject(id){
    return Observable
      .fromPromise(this.buildOptions(null))
      .switchMap((options) => this.http.get(this.propertiesURL + "/" + id, options));
  }

  createProject(project) {
    let data = new URLSearchParams();
    data.append('name', project.name);
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.post(this.propertiesURL, data, options));
  }

  editProject(project){
    let data = new URLSearchParams();
    data.append('name', project.name);
    return Observable
      .fromPromise(this.buildOptions(null))
      .switchMap((options) => this.http.put(this.propertiesURL + "/" + project.id, data, options));
  }

  deleteProject(id) {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.delete(this.propertiesURL + "/" + id, options));
  }
}
