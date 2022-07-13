import { UserRole } from "../../../static/core-enums";
import { IBase } from "./base.model";

export interface IUser extends IBase {
  email: string;
  name: string;
  imgURL?: string;
  role?: UserRole;
}
