import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserService {
  serverURL = 'http://198.27.119.182/api/v1';
  propertiesURL = this.serverURL + '/users';

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

  getUser(id) {
    return Observable
        .fromPromise(this.buildOptions(null))
        .switchMap((options) => this.http.get(this.propertiesURL + "/" + id, options));
  }
}
