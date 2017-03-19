import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Config } from '../config/config';


@Injectable()
export class UserService {
  public serverURL:string;
  public propertiesURL:string;

  constructor (protected http:Http, private _config:Config) {
	  this.serverURL = _config.get('apiUrl');
	  this.propertiesURL = this.serverURL + '/users';
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
