import { ITimeEntry } from "../../models/api";
import { ApiService } from "../api/api.service";
import { DateHelper } from "../../classes/date-helper.class";
import { BehaviorSubject } from "rxjs";

interface ITimeEntryServiceFullWatcher {
  timeEntry: ITimeEntry | null;
  timeDisplay: string | null;
}

export class TimeEntryService {
  private static counterInterval: NodeJS.Timeout;
  private static watchInterval: NodeJS.Timeout;
  private static fullWatcher = new BehaviorSubject<ITimeEntryServiceFullWatcher | null>(null);

  static init() {
    this.initWatcher();
    this.initCounter();
  }
  
  private static initCounter() {
    clearInterval(this.counterInterval);
    this.counterInterval = setInterval(() => {
      const fullWatcher = this.fullWatcher.getValue();
      if (fullWatcher !== null) {
        if (fullWatcher.timeEntry?.start) {
          const timeDisplay = DateHelper.getHoursAndMinutesFromNow(fullWatcher.timeEntry?.start);
          this.fullWatcher.next({
            timeDisplay,
            timeEntry: fullWatcher.timeEntry
          });
        }
      }
    }, 1000);
  }

  private static setUpdatedData() {
    ApiService.isTimeEntryOnGoing().then((isTimeEntryOnGoing) => {
      if (isTimeEntryOnGoing) {
        ApiService.getUnfinishedTimeEntry().then((timeEntry) => {
          if (timeEntry !== undefined) {
            this.fullWatcher.next(
              {
                timeEntry,
                timeDisplay: DateHelper.getHoursAndMinutesFromNow(timeEntry.start)
              }
            );
          } else {
            this.resetTimeEntry();
          }
        });
      } else {
        this.resetTimeEntry();
      }
    });
  }

  private static resetTimeEntry() {
    this.fullWatcher.next(null);
  }

  private static initWatcher() {
    this.resetTimeEntry();
    clearInterval(this.watchInterval);
    this.watchInterval = setInterval(() => {
      this.setUpdatedData();
    }, 5000);
  }

  static forceUpdate() {
    this.setUpdatedData();
  }

  static getAllInfo() {
    return this.fullWatcher.asObservable();
  }
}
