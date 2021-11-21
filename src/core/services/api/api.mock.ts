import { IBoolResponse, IProject, ITimeEntry, ITimeEntryPrimitive, IUser } from "../../models/api";
import { StorageKey } from "../../static/storage-key.enum";
import { ApiResponses } from "./api-responses.mock";

export class ApiMock {
  static getOwnUser(): IUser {
    return ApiResponses.getUser;
  }

  static getOwnProjects(): IProject[] {
    return ApiResponses.ownProjects;
  }

  static getProjectById(projectId: number): IProject | undefined {
    return ApiResponses.getProjectById(projectId);
  }

  static isTimeEntryOnGoing(): Promise<boolean> {
    return TimeEntryHelper.isTimeEntryOnGoing();
  }

  static createNewEntry(): Promise<IBoolResponse> {
    return new Promise(async (res, rej) => {
      try {
        const now = new Date();
        const isCreated = await TimeEntryHelper.createNewEntry({
          start: now,
          title: '',
        });
        res({
          result: isCreated,
        })
      } catch (e) {
        rej(e);
      }
    });
  }

  static getUnfinishedTimeEntry(): Promise<ITimeEntry | undefined> {
    return TimeEntryHelper.getUnfinishedTimeEntry();
  }
}

export class TimeEntryHelper {
  static createNewEntry(timeEntry: ITimeEntryPrimitive): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        const isTimeEntryOnGoing = await this.isTimeEntryOnGoing();
        if (!isTimeEntryOnGoing) {
          let newEntryId = 0;
          const storedEntries = await this.getStoredEntries();
          if (storedEntries.length > 0) {
            storedEntries.sort((a, b) => b.id - a.id);
            newEntryId = storedEntries[0].id + 1;
          }
    
          const newEntry: ITimeEntry = { ...timeEntry, id: newEntryId };
          storedEntries.push(newEntry);
          localStorage.setItem(StorageKey.TimeEntry, JSON.stringify(storedEntries));
          res(true);
        } else {
          res(false)
        }
      } catch (e) {
        rej(e);
      }
    })
  }

  static async isTimeEntryOnGoing(): Promise<boolean> {
    let isAnyEntryUnfinished = false;
    const storedEntries = await this.getStoredEntries();
    if (storedEntries.length > 0) {
      isAnyEntryUnfinished = storedEntries.find(e => e.end === undefined) !== undefined;
    }
    return isAnyEntryUnfinished;
  }

  static async getUnfinishedTimeEntry(): Promise<ITimeEntry | undefined> {
    const isTimeEntryOnGoing = await this.isTimeEntryOnGoing();
    if (isTimeEntryOnGoing) {
      const storedEntries = await this.getStoredEntries();
      return storedEntries.find(e => e.end === undefined);
    }

    return undefined;
  }

  static getStoredEntries(): Promise<ITimeEntry[]> {
    return new Promise((res, rej) => {
      try {
        let entries: ITimeEntry[] = [];
        const rawStoredEntries = localStorage.getItem(StorageKey.TimeEntry);
        if (rawStoredEntries !== null) {
          entries = JSON.parse(rawStoredEntries);  
        }
        res(entries);
      } catch (e) {
        rej(e);
      }
    });
  }
}