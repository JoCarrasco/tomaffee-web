import { DateHelper } from "../../classes/date-helper.class";
import { IProject, ITimeEntry, ITimeEntryBareBones, ITimeEntryPrimitive, IUser } from "../../models/api";
import { ITimer } from "../../models/api/responses/timer.model";
import { StorageKey } from "../../static/storage-key.enum";
import { ApiResponses } from "./api-responses.mock";

export class ApiMock {
  static getOwnUser(): IUser {
    return ApiResponses.getUser;
  }

  static getOwnProjects(): IProject[] {
    return ApiResponses.ownProjects;
  }

  static getTimerData(): Promise<ITimer> {
    return TimeEntryHelper.getTimerData();
  }

  static getProjectById(projectId: number): IProject | undefined {
    return ApiResponses.getProjectById(projectId);
  }

  static getTimeEntryById(timeEntryId: number): Promise<ITimeEntry | undefined> {
    return TimeEntryHelper.getTimeEntryById(timeEntryId);
  }

  static getRelevantEntries(numberOfDatesFromNow: number, currentDate: Date) {
    return TimeEntryHelper.getRelevantEntries(numberOfDatesFromNow, currentDate);
  }

  static getTimeEntriesByIds(ids: number[]): Promise<ITimeEntry[]> {
    return TimeEntryHelper.getTimeEntriesById(ids);
  }

  static updateTimeEntry(updatedTimeEntry: Partial<ITimeEntryBareBones>): Promise<null> {
    return TimeEntryHelper.updateTimeEntry(updatedTimeEntry);
  }

  static removeTimeEntry(id: number): Promise<void> {
    return TimeEntryHelper.removeEntry(id);
  }

  static getUserTimeEntries(): Promise<ITimeEntry[]> {
    return TimeEntryHelper.getStoredEntries();
  }

  static isTimeEntryOnGoing(): Promise<boolean> {
    return TimeEntryHelper.isTimeEntryOnGoing();
  }

  static createNewEntry(predefinedTimeEntry?: ITimeEntryPrimitive): Promise<ITimeEntry> {
    return new Promise(async (res, rej) => {
      try {
        const user = this.getOwnUser();
        const now = DateHelper.getNow().asDate;
        const timeEntry = await TimeEntryHelper.createNewEntry(
          user,
          predefinedTimeEntry ? predefinedTimeEntry :
          {
            start: now,
            title: '',
          }
        );
        res(timeEntry);
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
  static createNewEntry(user: IUser, timeEntry: ITimeEntryPrimitive): Promise<ITimeEntry> {
    return new Promise(async (res, rej) => {
      try {
        let newEntryId = 0;
        const storedEntries = await this.getStoredEntries();
        if (storedEntries.length > 0) {
          storedEntries.sort((a, b) => b.id - a.id);
          newEntryId = storedEntries[0].id + 1;
        }
  
        const newEntry: ITimeEntry = { ...timeEntry, id: newEntryId, owner: user};
        storedEntries.push(newEntry);
        await this.saveTimeEntries(storedEntries);
        res(newEntry);
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

  static async getTimeEntriesById(ids: number[]) {
    return (await this.getStoredEntries()).filter((entry) => ids.includes(entry.id));
  }

  static async getRelevantEntries(numberOfDatesFromNow: number, currentDate: Date) {
    const targetDates = DateHelper.getLastDaysDates(numberOfDatesFromNow);
    const entries = await this.getStoredEntries();
    const formattedEntries = [];

    for (const date of targetDates) {
      const dayEntries = entries.filter(e => DateHelper.isSameDay(date, e.start));
      if (dayEntries.length > 0) {
        formattedEntries.push({ date, entries: dayEntries });
      }
    }

    formattedEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    return formattedEntries;
  }

  static async getTimeEntryById(timeEntryId: number): Promise<ITimeEntry | undefined> {
    const entries = await this.getStoredEntries()
    return entries.find(e => e.id === timeEntryId);
  }

  static async updateTimeEntry(updatedTimeEntry: Partial<ITimeEntryBareBones>): Promise<null> {
    const entries = await this.getStoredEntries();
    const targetIndex = entries.findIndex(e => e.id === updatedTimeEntry.id);
    const targetTimeEntry = entries[targetIndex];
    delete updatedTimeEntry.id;
    const timeEntryWithChanges: ITimeEntry = {
      ...targetTimeEntry,
      ...updatedTimeEntry
    }
    entries[targetIndex] = timeEntryWithChanges;
    await this.saveTimeEntries(entries);
    return null;
  }

  private static saveTimeEntries(entries: ITimeEntry[]): Promise<void> {
    return new Promise((res) => {
      localStorage.setItem(StorageKey.TimeEntry, JSON.stringify(entries));
      res();
    });
  }

  static async removeEntry(id: number): Promise<void> {
    const entries = await this.getStoredEntries();
    const targetIndex = entries.findIndex(e => e.id === id);
    entries.splice(targetIndex, 1);
    this.saveTimeEntries(entries);
  }

  static async stopTimeEntry(timeEntryId: number): Promise<void> {
    this.updateTimeEntry({ id: timeEntryId, end: DateHelper.getNow().asDate })
  }

  static async getTimerData(): Promise<ITimer> {
    const storedEntries = await this.getStoredEntries();
    const targetEntry = storedEntries.find(e => e.end === undefined);
    return {
      unfinishedTimeEntry: targetEntry !== undefined ? targetEntry.id : undefined
    }
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
          });
          entries = entries.sort((e1, e2) => e2.id - e1.id);
        }
        res(entries);
      } catch (e) {
        rej(e);
      }
    });
  }
}
