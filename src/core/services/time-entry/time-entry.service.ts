import { ITimeEntry } from "../../models/api";
import { ApiService } from "../api/api.service";
import { DateHelper } from "../../classes/date-helper.class";
import { BehaviorSubject } from "rxjs";

interface ITimeEntryServiceFullWatcher {
  timeEntry: ITimeEntry;
  now: Date;
  editingTimeEntryId?: number;
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
        const updatedWatcher: ITimeEntryServiceFullWatcher = {
          ...fullWatcher,
          now: DateHelper.getNow()
        }
        this.fullWatcher.next(updatedWatcher);
      }
    }, 1000);
  }

  private static setUpdatedData() {
    ApiService.isTimeEntryOnGoing().then((isTimeEntryOnGoing) => {
      if (isTimeEntryOnGoing) {
        ApiService.getUnfinishedTimeEntry().then((timeEntry) => {
          if (timeEntry !== undefined) {
            const fullWatcher = this.fullWatcher.getValue();
            if (fullWatcher !== null) {
              this.fullWatcher.next(
                {
                  ...fullWatcher!,
                  timeEntry,
                  now: DateHelper.getNow()
                }
              );
            } else {
                this.fullWatcher.next(
                {
                  timeEntry,
                  now: DateHelper.getNow()
                }
              );
            }
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
    this.setUpdatedData();
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

  static setIsEditing(timeEntryId: number) {
    const fullWatcher = this.fullWatcher.getValue();
    console.log(fullWatcher);
    if (fullWatcher !== null) {
      const updatedWatcher: ITimeEntryServiceFullWatcher = {
        ...fullWatcher!,
        editingTimeEntryId: timeEntryId
      }
      this.fullWatcher.next(updatedWatcher);
    }
  }

  static removeEdition() {
    const fullWatcher = this.fullWatcher.getValue();
    if (fullWatcher !== null) {
      const updatedWatcher = {
        ...fullWatcher!,
        isEditing: undefined
      }
      this.fullWatcher.next(updatedWatcher);
    }
  }
}
