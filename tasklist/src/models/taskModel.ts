import { User } from './userModel';
import { Project } from './projectModel';
import { Label } from './labelModel';
import BaseModel from "./baseModel";

export class Task extends BaseModel {
  id:number;
  name:string;
  labels:Array<Label>;
  description:string;
  priority:number;
  done:boolean;
  assigned:User;
  created_by:User;
  creation_date:Date;
  end_date?:Date;
  project:Project;

  constructor(data:Object = {}) {
    super({
      id: data['id']||null,
      name: data['name']||'',
	  labels: data['labels']||[],
      description: data['description']||'',
      priority: data['priority']||0,
      done: data['done']||false,
      assigned: new User(data['assigned']||{}),
      created_by: new User(data['created_by']||{}),
      creation_date: new Date(data['creation_date']||Date.now()),
      end_date: data['end_date']||null,
      project: new Project(data['project']||{})
    });
  }
}
