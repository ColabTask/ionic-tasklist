import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Config } from '../config/config';

@Injectable()
export class NotificationService {
  public serverURL:string;
  public propertiesURL:string;

  constructor(public storage: Storage, protected http:Http, private _config:Config) {
    this.serverURL = _config.get('apiUrl');
    storage.get('user_id').then(
      (user_id) => {
        this.propertiesURL = this.serverURL + '/users/' + user_id + '/notification';
      }
    );

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

  listNotifications() {
    return Observable
      .fromPromise(this.buildOptions(null))
      .switchMap((options) => this.http.get(this.propertiesURL, options));
  }

  getNotification(id) {
    return Observable
      .fromPromise(this.buildOptions(null))
      .switchMap((options) => this.http.get(this.propertiesURL + '/' + id, options));
  }

  markNotificationAsRead(id) {
    let data = new URLSearchParams();
    data.append('is_read', 'True');

    return Observable
      .fromPromise(this.buildOptions(null))
      .switchMap((options) => this.http.patch(this.propertiesURL + '/' + id, data, options));
  }

  markNotificationAsUnread(id) {
    let data = new URLSearchParams();
    data.append('is_read', 'False');

    return Observable
      .fromPromise(this.buildOptions(null))
      .switchMap((options) => this.http.patch(this.propertiesURL + '/' + id, data, options));
  }
}
