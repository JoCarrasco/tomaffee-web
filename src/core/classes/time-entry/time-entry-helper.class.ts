import { DateHelper } from "..";
import { StorageKey } from "../..";
import { ITimeEntry } from "../../models/api";
import { StorageHelper } from "../storage/storage.helper.class";
import { v4 as uuidv4 } from 'uuid';

export class TimeEntryHelper {
  static async createNewEntry(data?: Partial<ITimeEntry>): Promise<ITimeEntry> {
    if (await this.isTimeEntryOnGoing()) {
      const targetUnfinishedEntry = await this.getUnfinishedTimeEntry();
      if (targetUnfinishedEntry !== undefined) {
        await this.updateTimeEntry({ id: targetUnfinishedEntry.id, end: DateHelper.getNow().asDate });
      }
    }

    return this.generateNewEntry(data);
  }

  private static generateNewEntry(data?: Partial<ITimeEntry>): Promise<ITimeEntry> {
    return new Promise(async (res, rej) => {
      try {
        const storedEntries = await this.getStoredEntries();
        // Note: isEditable prop, should not be setted in front, but should be verifiable 
        // in the backend, and user should not change that prop.
        const newEntry: ITimeEntry = { title: '', start: DateHelper.getNow().asDate, id: uuidv4(), isEditable: true } ;
        if (data !== undefined) { newEntry.title = data.title || '' }
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

  static async getTimeEntryBulkByIds(ids: string[]) {
    return (await this.getStoredEntries()).filter((entry) => ids.includes(entry.id));
  }

  static async getTimeEntriesByDays(numberOfDatesFromNow: number = 14): Promise<ITimeEntry[]> {
    const entries = await this.getStoredEntries();
    let formattedEntries: ITimeEntry[] = [];
    if (entries.length > 0) {
      const targetDates = DateHelper.getLastDaysDates(numberOfDatesFromNow);
      const firstDay = targetDates[0];
      const lastDay = targetDates[targetDates.length - 1];
      formattedEntries = entries.filter((x) => DateHelper.isBetween(x.start, firstDay, lastDay));
      formattedEntries.sort((a, b) => b.start.getTime() - a.start.getTime());
    }
    return formattedEntries;
  }

  static async getTimeEntryById(id: string): Promise<ITimeEntry | undefined> {
    const entries = await this.getStoredEntries()
    return entries.find(e => e.id === id);
  }

  static async updateTimeEntry(updatedTimeEntry: Partial<ITimeEntry>): Promise<void> {
    const entries = await this.getStoredEntries();
    const targetIndex = entries.findIndex(e => e.id === updatedTimeEntry.id);
    const targetTimeEntry = entries[targetIndex];
    delete updatedTimeEntry.id;
    const timeEntryWithChanges: ITimeEntry = {
      ...targetTimeEntry,
      ...updatedTimeEntry
    }
    entries[targetIndex] = timeEntryWithChanges;
    return this.saveTimeEntries(entries);
  }

  private static saveTimeEntries(entries: ITimeEntry[]): Promise<void> {
    return new Promise((res) => {
      StorageHelper.set(StorageKey.TimeEntries, entries);
      res();
    });
  }

  static parseEntriesToEntriesWithDate(entries: ITimeEntry[]): { date: Date; entries: ITimeEntry[]}[] {
    const formattedEntries: { date: Date; entries: ITimeEntry[] }[] = [];
    for (const entry of entries) {
      const targetFormattedIndex = formattedEntries.findIndex((x) => DateHelper.isSameDay(entry.start, x.date));
      if (targetFormattedIndex !== -1) {
        formattedEntries[targetFormattedIndex].entries.push(entry);
      } else {
        formattedEntries.push({ date: entry.start, entries: [entry] });
      }
    }
    
    return formattedEntries;
  }

  static async continueTimeEntry(id: string): Promise<ITimeEntry | undefined> {
    try {
      const entry = await this.getTimeEntryById(id);
      return this.createNewEntry({title: entry?.title});
    } catch (err) {
      console.error(err);
    }
  }

  static async removeEntry(id: string): Promise<void> {
    const entries = await this.getStoredEntries();
    const targetIndex = entries.findIndex(e => e.id === id);
    entries.splice(targetIndex, 1);
    this.saveTimeEntries(entries);
  }

  static async stopTimeEntry(id: string): Promise<void> {
    return this.updateTimeEntry({ id, end: DateHelper.getNow().asDate });
  }

  private static getStoredEntries(): Promise<ITimeEntry[]> {
    return new Promise((res, rej) => {
      try {
        let entries: ITimeEntry[] = StorageHelper.get(StorageKey.TimeEntries);
        if (entries !== null) {
          entries = entries.map((entry) => {
            entry.start = new Date(entry.start);
            if (entry.end !== undefined) {
              entry.end = new Date(entry.end);
            }
            return entry;
          });
          // NOTE: Fix stored entries sort function
          // entries = entries.sort((e1, e2) => e2.id - e1.id);
        }
        res(entries === null ? [] : entries);
      } catch (e) {
        rej(e);
      }
    });
  }
}
