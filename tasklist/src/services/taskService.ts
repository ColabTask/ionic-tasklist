import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";


@Injectable()
export class TaskService {
  serverURL = 'http://198.27.119.182/api/v1';
  propertiesURL = this.serverURL + '/tasks';
  token = '8d876539b674331b4e1cb1ec8bef31b2e9c29681';

  constructor (protected http:Http) {
  }

  listTasks() {
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.propertiesURL, options)
      .map(response => response.json());
  }

  getTasksByAssigned(id){
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.token);
    let params = new URLSearchParams();
    params.set('assigned__id', id);
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.propertiesURL, options)
      .map(response => response.json());
  }

  getTasksByProject(id) {
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.token);
    let params = new URLSearchParams();
    params.set('project__id', id);
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.propertiesURL, options)
      .map(response => response.json());
  }

  getTasksByEndDate(endDate) {
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.token);
    let params = new URLSearchParams();
    params.set('end_date', endDate);
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.propertiesURL, options)
      .map(response => response.json());
  }
}
