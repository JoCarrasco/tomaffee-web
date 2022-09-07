import { IUser } from ".";
import { IBase } from "./base.model";

export interface IProject extends IBase {
  name: string;
  description: string | null;
  owner: IUser;
  teamMembers?: IUser[];
}
