import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TimeEntryHelper } from '../../classes/time-entry/time-entry-helper.class';
import { ITimeEntry } from '../../models/api';
export class TimeEntryService {
  private static timeEntries$ = new BehaviorSubject<ITimeEntry[]>([]);
  public static timeEntries: Observable<ITimeEntry[]> = this.timeEntries$.asObservable();
  
  private static isInitialized: boolean = false;
  private static numberOfDatesFromNow = 14;
  private static subscription: Subscription;

  static init() {
    if (!this.isInitialized) {
      this.updateTimeEntries();
      this.isInitialized = true;
    }
  }

  private static async updateTimeEntries(): Promise<void> {
    try {
      this.timeEntries$.next(await TimeEntryHelper.getTimeEntriesByDays(this.numberOfDatesFromNow));
    } catch (err) {
      console.error(err);
    }
  }

  static async createNewEntry() {
    await TimeEntryHelper.createNewEntry();
    await this.updateTimeEntries();
  }

  static kill() {
    this.subscription.unsubscribe();
  }

  static async removeTimeEntry(id: string): Promise<void> {
    try {
      await TimeEntryHelper.removeEntry(id);
      await this.updateTimeEntries();
    } catch (err) {
      console.error(err);
    }
  }

  static async stopTimeEntry(id: string): Promise<void> {
    try {
      await TimeEntryHelper.stopTimeEntry(id);
      await this.updateTimeEntries();
    } catch (err) {
      console.error(err);
    }
  }

  static async continueTimeEntry(id: string): Promise<ITimeEntry | undefined> {
    try {
      const entry = await TimeEntryHelper.continueTimeEntry(id);
      await this.updateTimeEntries();
      return entry;
    } catch (err) {
      console.error(err);
    }
  }

  static async updateTimeEntry(id: string, change: Partial<ITimeEntry>) {
    try {
      const updatedEntry = await TimeEntryHelper.updateTimeEntry({ ...change, id })
      await this.updateTimeEntries();
      return updatedEntry;
    } catch (err) {
      console.error(err);
    }
  }
}
