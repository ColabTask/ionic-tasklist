import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";


@Injectable()
export class ProjectService {
  serverURL = 'http://198.27.119.182/api/v1';
  propertiesURL = this.serverURL + '/projects';
  token = '8d876539b674331b4e1cb1ec8bef31b2e9c29681';

  constructor (protected http:Http) {
  }

  listProjects() {
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.propertiesURL, options)
      .map(response => response.json());
  }

  createProject(project) {
    let data = new URLSearchParams();
    data.append('name', project.name);
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.propertiesURL, data, options)
      .map(response => response.json());
  }
}
