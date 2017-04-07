import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Config } from '../config/config';
import * as io from "socket.io-client";

/**
 *
 */

@Injectable()
export class SocketService {
  private _socketUrl:string;
  private _socket:any;

  constructor (public storage: Storage, protected http:Http, private _config:Config) {
    this._socketUrl = _config.get('socketUrl');
    this._socket = null;
  }

  connect(token:string, userid:string) {
    return new Promise((resolve, reject) => {
      this._socket = io.connect(this._socketUrl);
      this._socket.on('connect', () => {
        // When one is connected, proceed to authentication
        this._socket.emit('authenticate', {
          token: token,
          id: userid
        }, (res) => {
          console.log(res);
          if( res.status ) {
            resolve();
          } else {
            reject();
          }
        });
      });
    });

  }

  subscribe(channel:string) {
    return new Promise((resolve, reject) => {
      if( this._socket == null || !this._socket.connected ) {
        reject();
        return;
      }

      this._socket.emit('subscribe', {channel}, (res) => {
        if( res.status ) {
          const key = 'on' + channel.charAt(0).toUpperCase() + channel.slice(1);
          const stream = Observable.fromEvent(this._socket, key);
          resolve(stream);
        } else {
          reject();
        }
      });
    });
  }

  unsubscribe(channel:string) {
    return new Promise((resolve, reject) => {
      if( this._socket == null || !this._socket.connected ) {
        reject();
        return;
      }

      this._socket.emit('unsubscribe', {channel}, (res) => {
        if( res.status ) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  emit(channel:string, event:string, data:Object = {}) {
    return new Promise((resolve, reject) => {
      if( this._socket == null || !this._socket.connected ) {
        reject();
        return;
      }

      this._socket.emit(channel + '.' + event, data, (res) => {
        if(res.status) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

}
