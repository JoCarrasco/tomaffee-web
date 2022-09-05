import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TimeEntryHelper } from '../../classes/time-entry/time-entry-helper.class';
import { ITimeEntry } from '../../models';
export class TimeEntryService {
  private static timeEntries$ = new BehaviorSubject<ITimeEntry[]>([]);
  public static timeEntries: Observable<ITimeEntry[]> = this.timeEntries$.asObservable();
  
  private static isInitialized: boolean = false;
  private static numberOfDatesFromNow = 14;
  private static subscription: Subscription;

  static init() {
    if (!this.isInitialized) {
      this.updateTimeEntries().then(() => {
        this.isInitialized = true;
      });
    }
  }

  static async updateTimeEntries(): Promise<void> {
    try {
      this.timeEntries$.next(await TimeEntryHelper.getTimeEntriesByDays(this.numberOfDatesFromNow));
    } catch (err) {
      console.error(err);
    }
  }

  static async startNewEntry(data?: Partial<ITimeEntry>) {
    await TimeEntryHelper.createNewEntry(data);
    return this.updateTimeEntries();
  }

  static kill() {
    this.subscription.unsubscribe();
  }

  static async removeTimeEntry(id: string): Promise<void> {
    try {
      TimeEntryHelper.removeEntry(id).then(() => {
        this.updateTimeEntries();
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async stopTimeEntry(id: string): Promise<void> {
    try {
      await TimeEntryHelper.stopTimeEntry(id);
      return this.updateTimeEntries();
    } catch (err) {
      console.error(err);
    }
  }

  static async continueTimeEntry(id: string): Promise<void> {
    try {
      await TimeEntryHelper.continueTimeEntry(id);
      return this.updateTimeEntries();
    } catch (err) {
      console.error(err);
    }
  }

  static async updateTimeEntry(id: string, change: Partial<ITimeEntry>) {
    try {
      await TimeEntryHelper.updateTimeEntry({ ...change, id })
      return this.updateTimeEntries();
    } catch (err) {
      console.error(err);
    }
  }
}
