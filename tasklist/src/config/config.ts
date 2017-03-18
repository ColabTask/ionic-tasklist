import { Injectable } from '@angular/core';

declare var require:any;

@Injectable()
export class Config {
	public static CONFIGURATION_PATH = '.';

  private static _config: Object;
  private static _env: Object;

  constructor() {}

  public load() {
    return new Promise((resolve, reject) => {
      Config._env = require(Config.CONFIGURATION_PATH + '/env.json');
      Config._config = require(Config.CONFIGURATION_PATH + '/' + Config._env['environment'] + '.json');
      resolve(true);
    });
  }

	/**
	 * Get a configuration
	 * @param {string} key The key to fetch
	 * @param {any} def Default value if key is not found
	 * @return any
	 */
  public get(key:string, def:any = ''): any {
    return !this.has(key) ? def : Config._config[key];
  }

	/**
	 * Check if the key exists
	 * @param {string} key The key to validate
	 * @return boolean
	 */
	public has(key:string):boolean {
		return Config._config[key] != undefined;
	}

};
