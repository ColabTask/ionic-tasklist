import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Config} from '../config/config';


@Injectable()
export class AuthenticationService {
  public serverURL:string;

  constructor (protected http:Http, private _config:Config) {
	  this.serverURL = _config.get('apiUrl');
  }

  authenticate(username, password) {
    let data = new URLSearchParams();
    data.append('login', username);
    data.append('password', password);
    return this.http.post(this.serverURL + '/token-auth', data)
      .map(response => response.json());
  }
}
