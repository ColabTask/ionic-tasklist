import BaseModel from "./baseModel";

export class Access extends BaseModel {
  right: string;
  user: number;
  project: number;
}
