import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";


@Injectable()
export class AuthenticationService {
  serverURL = 'http://198.27.119.182/api/v1';
  token = '8d876539b674331b4e1cb1ec8bef31b2e9c29681';

  constructor (protected http:Http) {
  }

  authenticate(username, password) {
    let data = new URLSearchParams();
    data.append('login', username);
    data.append('password', password);
    return this.http.post(this.serverURL + '/token-auth', data)
      .map(response => response.json());
  }
}
