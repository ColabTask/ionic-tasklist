/**
 * Base model with default methods for all the application's models
 */

export default class BaseModel {

  constructor(data:Object = {}) {
    for(var name in data) {
      if( data.hasOwnProperty(name) ) {
        this[name] = data[name];
      }
    }
  }

  props() {
    const props = {};
    for(var name in this) {
      if( this.hasOwnProperty(name) ) {
        props[name] = this[name];
      }
    }
    return props;
  }

}
