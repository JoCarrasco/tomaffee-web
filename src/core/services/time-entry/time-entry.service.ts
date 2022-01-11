import { ApiService } from "../api/api.service";
import { DateHelper } from "../../classes";
import { TimeEntryServiceConstants } from "./time-entry.service.constants";
import { BehaviorSubject, Observable } from "rxjs";
import { ITimeEntryPrimitive } from "../../models/api";
import { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncTimer } from 'set-interval-async/fixed';

interface ITimeEntryServiceFullWatcher {
  now: Date;
  timeEntryId?: number;
}

interface ITimeEntryChangeRequest {
  id: number;
  type: ITimeEntryChangeRequestType;
}

// NOTE: Change location of ITimeEntryChangeRequestType 
export enum ITimeEntryChangeRequestType {
  Creation = 0,
  Update,
  Remove
};

export class TimeEntryService {
  private static isOngoing: boolean = false;
  private static counterInterval: NodeJS.Timeout | undefined;
  private static watchInterval: SetIntervalAsyncTimer | undefined;
  private static fullWatcher = new BehaviorSubject<ITimeEntryServiceFullWatcher | null>(null);
  private static changeRequest = new BehaviorSubject<ITimeEntryChangeRequest[] | null>(null);
  private static selectedTimeEntryIds = new BehaviorSubject<number[] | null>(null);

  static async init() {
    if (!this.isOngoing) {
      await this.initWatcher();
    }
  }

  static addTimeEntryToSelection(id: number) {
    let selectedIds = this.selectedTimeEntryIds.getValue();
    selectedIds !== null ? selectedIds.push(id) : selectedIds = [id];
    this.selectedTimeEntryIds.next(selectedIds);
  }

  static removeTimeEntryFromSelection(id: number) {
    const selectedIds = this.selectedTimeEntryIds.getValue();
    if (selectedIds !== null) {
      const targetIndex = selectedIds.findIndex(x => x === id);
      selectedIds.splice(targetIndex, 1);
      this.selectedTimeEntryIds.next(selectedIds);
    }
  }

  static getSelectedTimeEntries() {
    return this.selectedTimeEntryIds.asObservable();
  }

  static getChangeRequests(): Observable<ITimeEntryChangeRequest[] | null> {
    return this.changeRequest.asObservable();
  }

  static sendChangeRequest(ids: ITimeEntryChangeRequest[]) {
    this.changeRequest.next(ids);
  }

  static closeChangeRequest() {
    this.changeRequest.next(null);
  }

  static async initWithNewTimeEntry(predefinedTimeEntry?: ITimeEntryPrimitive) {
    if (!this.isOngoing) {
      const createdTimeEntry = await ApiService.createNewEntry(predefinedTimeEntry);
      // NOTE: Change location of ITimeEntryChangeRequestType 
      this.sendChangeRequest([{
        id: createdTimeEntry.id,
        type: ITimeEntryChangeRequestType.Creation
      }]);
      await this.initWatcher();
    }
  }

  static getWatcher(): Observable<ITimeEntryServiceFullWatcher | null> {
    return this.fullWatcher.asObservable();
  }

  static async stop() {
    const fullWatcher = this.fullWatcher.getValue();
    if (fullWatcher !== null) {
      const id = fullWatcher.timeEntryId;
      if (id !== undefined) {
        await this.stopWatcher();
        this.sendChangeRequest([{ id, type: ITimeEntryChangeRequestType.Update }]);
      }
    }
  }

  static setTimeEntryEdition(timeEntryId: number): void {
    const fullWatcher = this.fullWatcher.getValue();
    if (fullWatcher === null) return;
    this.fullWatcher.next({ ...fullWatcher, timeEntryId});
  }

  private static setUpdatedData(): Promise<void> {
    return new Promise((res, rej) => {
      ApiService.getTimerData().then((timer) => {
        if (timer.unfinishedTimeEntry !== undefined) {
          const fullWatcher = this.fullWatcher.getValue();
          const partialWatcherValue = { timeEntryId: timer.unfinishedTimeEntry, now: DateHelper.getNow().asDate };
          this.fullWatcher.next(
            fullWatcher !== null ?
            { ...fullWatcher, ...partialWatcherValue } :
            partialWatcherValue
          );
          if (!this.isOngoing) {
            this.isOngoing = true;
          }
          res();
        }
      });
    })
  }

  private static initWatcher(): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        await this.initCounter();
        await this.setUpdatedData();
        if (this.watchInterval === undefined) {
          this.watchInterval = setIntervalAsync(async () => { await this.setUpdatedData() }, TimeEntryServiceConstants.watcherPeriod)
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
          clearIntervalAsync(this.watchInterval);
          this.watchInterval = undefined;
        }
        
        await this.sendStopSignalToApi();
        this.stopCounter();
        this.isOngoing = false;
        this.fullWatcher.next(null);
        res();
      } catch (e) {
        console.error(e);
        rej(e);
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
                now: DateHelper.getNow().asDate
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
    if (fullWatcher === null) return;
    if (fullWatcher.timeEntryId === undefined) return;
    return ApiService.stopTimeEntry(fullWatcher.timeEntryId);
  }

  static async removeTimeEntry(id: number) {
    await this.stop();
    await ApiService.removeTimeEntry(id);
    this.sendChangeRequest([{ id, type: ITimeEntryChangeRequestType.Remove }])
  }
}
