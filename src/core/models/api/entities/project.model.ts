import { IUser } from ".";

export interface IProject {
  id: number;
  name: string;
  description: string | null;
  owner: IUser;
  teamMembers?: IUser[];
}
