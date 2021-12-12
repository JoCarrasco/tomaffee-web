import { IUser, IProject, IBoolResponse, ITimeEntry, ITimeEntryBareBones, ITimeEntryPrimitive } from "../../models/api";
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

  static getTimeEntryById(timeEntryId: number): Promise<ITimeEntry | undefined> {
    return ApiMock.getTimeEntryById(timeEntryId);
  }

  static getTimeEntriesByIds(ids: number[]): Promise<ITimeEntry[]> {
    return ApiMock.getTimeEntriesByIds(ids);
  }

  static createNewEntry(predefinedTimeEntry?: ITimeEntryPrimitive): Promise<ITimeEntry> {
    return ApiMock.createNewEntry(predefinedTimeEntry);
  }

  static async getUserTimeEntries(): Promise<ITimeEntry[]> {
    return ApiMock.getUserTimeEntries();
  }

  static isTimeEntryOnGoing(): Promise<boolean> {
    return ApiMock.isTimeEntryOnGoing();
  }

  static stopTimeEntry(timeEntryId: number): Promise<void> {  
    return ApiMock.stopTimeEntry(timeEntryId);
  }

  static getUserStoredEntries(): Promise<ITimeEntry[]> {
    return ApiMock.getUserTimeEntries();
  }

  static getUnfinishedTimeEntry(): Promise<ITimeEntry | undefined> {
    return ApiMock.getUnfinishedTimeEntry();
  }

  static updateTimeEntry(updatedTimeEntry: Partial<ITimeEntryBareBones>): Promise<null> {
    return ApiMock.updateTimeEntry(updatedTimeEntry);
  }
}
