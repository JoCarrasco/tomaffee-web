import { DateHelper } from "../../classes/date-helper.class";
import { IBoolResponse, IProject, ITimeEntry, ITimeEntryBareBones, ITimeEntryPrimitive, IUser } from "../../models/api";
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

  static getTimeEntryById(timeEntryId: number): Promise<ITimeEntry | undefined> {
    return TimeEntryHelper.getTimeEntryById(timeEntryId);
  }

  static updateTimeEntry(updatedTimeEntry: Partial<ITimeEntryBareBones>): Promise<null> {
    return TimeEntryHelper.updateTimeEntry(updatedTimeEntry);
  }

  static getUserTimeEntries(): Promise<ITimeEntry[]> {
    return TimeEntryHelper.getStoredEntries();
  }

  static isTimeEntryOnGoing(): Promise<boolean> {
    return TimeEntryHelper.isTimeEntryOnGoing();
  }

  static createNewEntry(): Promise<IBoolResponse> {
    return new Promise(async (res, rej) => {
      try {
        const user = this.getOwnUser();
        const now = DateHelper.getNow();
        const isCreated = await TimeEntryHelper.createNewEntry(
          user,
          {
            start: now,
            title: '',
          }
        );
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

  static stopTimeEntry(timeEntryId: number): Promise<void> {
    return TimeEntryHelper.stopTimeEntry(timeEntryId);
  }
}

export class TimeEntryHelper {
  static createNewEntry(user: IUser, timeEntry: ITimeEntryPrimitive): Promise<boolean> {
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
    
          const newEntry: ITimeEntry = { ...timeEntry, id: newEntryId, owner: user};
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

  static async getTimeEntryById(timeEntryId: number): Promise<ITimeEntry | undefined> {
    const entries = await this.getStoredEntries()
    return entries.find(e => e.id === timeEntryId);
  }

  static async updateTimeEntry(updatedTimeEntry: Partial<ITimeEntryBareBones>): Promise<null> {
    const entries = await this.getStoredEntries()
    const targetIndex = entries.findIndex(e => e.id === updatedTimeEntry.id);
    let targetTimeEntry = entries[targetIndex];
    delete updatedTimeEntry.id;
    const timeEntryWithChanges: ITimeEntry = {
      ...targetTimeEntry,
      ...updatedTimeEntry
    }
    entries[targetIndex] = timeEntryWithChanges;
    return null;
  }

  static async stopTimeEntry(timeEntryId: number): Promise<void> {
    const entries = await this.getStoredEntries();
    const findTargetEntry = entries.findIndex(e => e.id === timeEntryId);
    entries[findTargetEntry].end = DateHelper.getNow();
    return localStorage.setItem(StorageKey.TimeEntry, JSON.stringify(entries));
  }

  static getStoredEntries(): Promise<ITimeEntry[]> {
    return new Promise((res, rej) => {
      try {
        let entries: ITimeEntry[] = [];
        const rawStoredEntries = localStorage.getItem(StorageKey.TimeEntry);
        if (rawStoredEntries !== null) {
          entries = JSON.parse(rawStoredEntries);
          entries = entries.map((entry) => {
            entry.start = new Date(entry.start);
            if (entry.end !== undefined) {
              entry.end = new Date(entry.end);
            }
            return entry;
          })
        }
        res(entries);
      } catch (e) {
        rej(e);
      }
    });
  }
}
