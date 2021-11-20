import { UserRole } from "../../../static/core-enums";

export interface IUser {
  email: string;
  name: string;
  imgURL?: string;
  role?: UserRole;
}
