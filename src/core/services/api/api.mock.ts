import { DateHelper } from "../../classes";
import { StorageHelper } from "../../classes/storage/storage.helper.class";
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

  static getRelevantEntries(numberOfDatesFromNow: number) {
    return TimeEntryHelper.getRelevantEntries(numberOfDatesFromNow);
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
    const storedEntries = await this.getStoredEntries();
    if (storedEntries.length > 0) {
      return storedEntries.find(e => e.end === undefined) !== undefined;
    }
    return false;
  }

  static async getUnfinishedTimeEntry(): Promise<ITimeEntry | undefined> {
    const isTimeEntryOnGoing = await this.isTimeEntryOnGoing();
    if (isTimeEntryOnGoing) {
      return (await this.getStoredEntries()).find(e => e.end === undefined);
    }

    return undefined;
  }

  static async getTimeEntriesById(ids: number[]) {
    return (await this.getStoredEntries()).filter((entry) => ids.includes(entry.id));
  }

  static async getRelevantEntries(numberOfDatesFromNow: number) {
    const entries = await this.getStoredEntries();
    const formattedEntries = [];
    if (entries.length > 0) {
      const targetDates = DateHelper.getLastDaysDates(numberOfDatesFromNow);
      console.log('Stored entries', entries);
      console.log('TARGET DATES', targetDates);
  
      for (const date of targetDates) {
        const dayEntries = entries.filter(e => DateHelper.isSameDay(date, e.start));
        console.log(dayEntries);
        if (dayEntries.length > 0) {
          formattedEntries.push({ date, entries: dayEntries });
        }
      }
      console.log(formattedEntries);
      formattedEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
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
      StorageHelper.set(StorageKey.TimeEntry, entries);
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
      unfinishedEntryId: targetEntry !== undefined ? targetEntry.id : undefined
    }
  }

  static getStoredEntries(): Promise<ITimeEntry[]> {
    return new Promise((res, rej) => {
      try {
        let entries: ITimeEntry[] = StorageHelper.get(StorageKey.TimeEntry);
        if (entries !== null) {
          entries = entries.map((entry) => {
            entry.start = new Date(entry.start);
            if (entry.end !== undefined) {
              entry.end = new Date(entry.end);
            }
            return entry;
          });
          entries = entries.sort((e1, e2) => e2.id - e1.id);
        }
        res(entries === null ? [] : entries);
      } catch (e) {
        rej(e);
      }
    });
  }
}
