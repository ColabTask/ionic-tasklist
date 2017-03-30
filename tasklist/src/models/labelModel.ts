import { Project } from './projectModel';
import BaseModel from "./baseModel";

export class Label extends BaseModel {
  id:number;
  name:string;
  color:string;
  project:Project;

  constructor(data:Object = {}) {
    super({
	  id: data['id']||null,
      name: data['name']||'',
	  color: data['color']||'',
      project: new Project(data['project']||{})
    });
  }

}
