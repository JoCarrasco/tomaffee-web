import { BehaviorSubject, Observable } from 'rxjs';
import { DateHelper } from '../../classes';
import { TimerCoreService } from './timer.service.core';
import { IWatcherData } from './timer.service.models';
import { TimeEntryService } from '../time-entry';
import { ApiMock } from '../api/api.mock';

export class TimerService extends TimerCoreService {
  private static isOngoing$ = new BehaviorSubject<boolean>(false);
  public static readonly isOngoing: Observable<boolean> = this.isOngoing$.asObservable();

  private static watcher$ = new BehaviorSubject<IWatcherData | null>(null);
  public static readonly watcher = this.watcher$.asObservable();

  static async initialize() {
    if (!this.isOngoing$.getValue()) {
      await this.setUpdatedData();
      this.startApiWatcher(() => this.setUpdatedData());
      this.startCounter(() => this.setTimeUpdate());
    }
  }

  static async start(id?: number): Promise<void> {
    const watcher = this.watcher$.getValue();
    if (watcher !== null) {
      if (watcher.onGoingEntryId !== undefined) {
        await TimeEntryService.stopTimeEntry(watcher.onGoingEntryId);
      }

      await this.startEntryRecord(id === undefined, id);
    } 
  }

  static async stop(): Promise<void> {
    const watcher = this.watcher$.getValue();
    if (watcher !== null) {
      if (watcher.onGoingEntryId !== undefined) {
        await TimeEntryService.stopTimeEntry(watcher.onGoingEntryId);
      }
    }
    
    this.stopApiWatcher();
    this.stopCounter();
    this.isOngoing$.next(false);
    this.watcher$.next(null);
  }

  private static async startEntryRecord(
    isNewEntry: boolean = true,
    id?: number,
  ): Promise<void> {
    if (isNewEntry) {
      TimeEntryService.createNewEntry().then((newTimeEntry) => {
        this.updateWatcherEntry(newTimeEntry.id)
      });
    } else {
      if (id === undefined) {
        console.error(`Error, Id for starting a cloned time entry is not passed`);
        return;
      }
      return this.updateWatcherEntry(id)
    }
  }

  private static updateWatcherEntry(timeEntryId: number): void {
    const watcher = this.watcher$.getValue();
    console.log(watcher);
    if (watcher === null) return;
    this.watcher$.next({ ...watcher, onGoingEntryId: timeEntryId });
  }

  private static async setTimeUpdate(): Promise<void> {
    return new Promise((res) => {
      const val = this.watcher$.getValue();
      if (val !== null) {
        val.now = DateHelper.getNow().asDate;
        this.watcher$.next(val);
      }
      res();
    });
  }

  private static async setUpdatedData(): Promise<void> {
    return new Promise(async (res) => {
      const timer = await ApiMock.getTimerData();
      const now = DateHelper.getNow().asDate;
      if (timer.unfinishedEntryId !== undefined) {
        this.watcher$.next({
          onGoingEntryId: timer.unfinishedEntryId,
          now,
        });
        this.isOngoing$.next(true);
      } else {
        this.watcher$.next({ ...timer, now })
        this.isOngoing$.next(false);
      }
      res();
    })
  }
}
