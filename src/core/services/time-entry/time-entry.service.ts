import { ApiService } from "../api/api.service";
import { DateHelper } from "../../classes/date-helper.class";
import { TimeEntryServiceConstants } from "./time-entry.service.constants";
import { BehaviorSubject, Observable } from "rxjs";

interface ITimeEntryServiceFullWatcher {
  now: Date;
  timeEntryId?: number;
}

export class TimeEntryService {
  private static isOngoing: boolean = false;
  private static counterInterval: NodeJS.Timeout | undefined;
  private static watchInterval: NodeJS.Timeout | undefined;
  private static fullWatcher = new BehaviorSubject<ITimeEntryServiceFullWatcher | null>(null);

  static init() {
    if (!this.isOngoing) {
      this.initWatcher();
    }
  }

  static async initWithNewTimeEntry() {
    if (!this.isOngoing) {
      await ApiService.createNewEntry();
      this.initWatcher();
    }
  }

  static getWatcher(): Observable<ITimeEntryServiceFullWatcher | null> {
    return this.fullWatcher.asObservable();
  }

  static stop() {
    return this.stopWatcher();
  }

  static setTimeEntryEdition(timeEntryId: number): void {
    const fullWatcher = this.fullWatcher.getValue();
    if (fullWatcher !== null) {
      const updatedWatcher: ITimeEntryServiceFullWatcher = {
        ...fullWatcher,
        timeEntryId
      }
      this.fullWatcher.next(updatedWatcher);
    }
  }

  private static setUpdatedData(): Promise<void> {
    return new Promise((res, rej) => {
      ApiService.isTimeEntryOnGoing().then((isTimeEntryOnGoing) => {
        if (isTimeEntryOnGoing) {
          ApiService.getUnfinishedTimeEntry().then((timeEntry) => {
            if (timeEntry) {
              const fullWatcher = this.fullWatcher.getValue();
              const partialWatcherValue = { timeEntryId: timeEntry.id, now: DateHelper.getNow() };
              this.fullWatcher.next(
                fullWatcher != null ?
                { ...fullWatcher, ...partialWatcherValue } :
                partialWatcherValue
              );
  
              if (!this.isOngoing) {
                this.isOngoing = true;
              }
              res();
            } else {
              this.stopWatcher();
              res();
            }
          }).catch((err) => {
            console.log(err);
            rej(err);
          });
        } else {
          this.stopWatcher();
          res();
        }
      }).catch((e) => {
        console.error(e);
        rej(e);
      });
    })
  }

  private static initWatcher(): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        if (this.watchInterval === undefined) {
          await this.initCounter();
          await this.setUpdatedData();
          this.watchInterval = setInterval(() => {
            this.setUpdatedData();
          }, TimeEntryServiceConstants.watcherPeriod);
        }
        res();
      } catch (err) {
        rej(err);
      }
    });
  }

  private static stopWatcher(): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        
        if (this.watchInterval) {
          clearInterval(this.watchInterval);
          this.watchInterval = undefined;
        }
        
        await this.sendStopSignalToApi();
        this.stopCounter();
        this.isOngoing = false;
        this.fullWatcher.next(null);
        res();
      } catch (e) {
        rej();
      }
    });
  }

  private static initCounter(): Promise<void> {
    return new Promise((res, rej) => {
      try {
        if (this.counterInterval === undefined) {
          this.counterInterval = setInterval(() => {
            const fullWatcher = this.fullWatcher.getValue();
            if (fullWatcher !== null) {
              const updatedWatcher: ITimeEntryServiceFullWatcher = {
                ...fullWatcher,
                now: DateHelper.getNow()
              }
              this.fullWatcher.next(updatedWatcher);
            }
          }, TimeEntryServiceConstants.counterPeriod);
        }
        res();
      } catch (err) {
        rej(err);
      }
    })
  }

  private static stopCounter(): void {
    if (this.counterInterval !== undefined) {
      clearInterval(this.counterInterval);
      this.counterInterval = undefined;
    }
  }

  private static async sendStopSignalToApi() {
    const fullWatcher = this.fullWatcher.getValue();
    if (fullWatcher !== null) {
      const timeEntryId = fullWatcher.timeEntryId;
      if (timeEntryId !== undefined) {
        return ApiService.stopTimeEntry(timeEntryId);
      }
    }

    return;
  }
}
