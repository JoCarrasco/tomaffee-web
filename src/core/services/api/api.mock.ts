import { IBoolResponse, IProject, ITimeEntry, ITimeEntryPrimitive, IUser } from "../../models/api";
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

export class TimeEntryHelper {
  static createNewEntry(timeEntry: ITimeEntryPrimitive): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        console.log(timeEntry);
        const isTimeEntryOnGoing = await this.isTimeEntryOnGoing();
        console.log(isTimeEntryOnGoing);
        if (!isTimeEntryOnGoing) {
          let newEntryId = 0;
          const storedEntries = await this.getStoredEntries();
          if (storedEntries.length > 0) {
            storedEntries.sort((a, b) => b.id - a.id);
            newEntryId = storedEntries[0].id + 1;
          }
    
          const newEntry: ITimeEntry = {
            ...timeEntry,
            id: newEntryId
          };
          console.log(storedEntries);
          storedEntries.push(newEntry);
          // consol
          localStorage.setItem('tmf-time_entries', JSON.stringify(storedEntries));
          res(true);
        } else {
          res(false)
        }
      } catch (e) {
        rej(e);
      }
    })
  }

  static async isTimeEntryOnGoing() {
    let isAnyEntryUnfinished = false;
    const storedEntries = await this.getStoredEntries();
    if (storedEntries.length > 0) {
      isAnyEntryUnfinished = storedEntries.find(e => e.end === undefined) !== undefined;
    }
    return isAnyEntryUnfinished;
  }

  static getStoredEntries(): Promise<ITimeEntry[]> {
    return new Promise((res, rej) => {
      try {
        let entries: ITimeEntry[] = [];
        const rawStoredEntries = localStorage.getItem('tmf-time_entries');
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