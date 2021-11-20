import { IUser, IProject, IBoolResponse } from "../../models/api";
import { ApiResponses } from "./api-responses.mock";
import { TimeEntryHelper } from "./api.mock";

export class ApiService {
   static getOwnUser(): IUser {
    return ApiResponses.getUser;
  }

  static getOwnProjects(): IProject[] {
    return ApiResponses.ownProjects;
  }

  static getProjectById(projectId: number): IProject | undefined {
    return ApiResponses.getProjectById(projectId);
  }

  static createNewEntry(): Promise<IBoolResponse> {
    return new Promise(async (res, rej) => {
      try {
        const now = new Date();
        const isCreated = await TimeEntryHelper.createNewEntry({
          start: now,
          description: '',
        });
        res({
          result: isCreated,
        })
      } catch (e) {
        rej(e);
      }
    });
  }
}