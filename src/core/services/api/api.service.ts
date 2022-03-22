import { IUser, IProject } from "../../models/api";
import { ApiMock } from "./api.mock";

export class ApiService {
  static getOwnUser(): IUser {
    return ApiMock.getOwnUser();
  }

  static getOwnProjects(): IProject[] {
    return ApiMock.getOwnProjects();
  }

  static getProjectById(projectId: number): IProject | undefined {
    return ApiMock.getProjectById(projectId);
  }
}
