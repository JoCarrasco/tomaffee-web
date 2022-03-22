import { BehaviorSubject, Observable } from 'rxjs';
import { ITimeEntry, ITimeEntryPrimitive, ITimeEntryBareBones } from '../../models/api';
import { ApiMock } from '../api/api.mock';

export class TimeEntryService {
  private static updateFlag$ = new BehaviorSubject<boolean>(false);
  public static readonly updateFlag: Observable<boolean> = this.updateFlag$.asObservable();

  static setUpdateFlag(value: boolean) {
    this.updateFlag$.next(value);
  }

  static getTimeEntryById(timeEntryId: number): Promise<ITimeEntry | undefined> {
    return ApiMock.getTimeEntryById(timeEntryId);
  }

  static getRelevantEntries(numberOfDatesFromNow: number) {
    return ApiMock.getRelevantEntries(numberOfDatesFromNow);
  }
  
  static removeTimeEntry(id: number): Promise<void> {
    return ApiMock.removeTimeEntry(id);
  }

  static getTimeEntriesByIds(ids: number[]): Promise<ITimeEntry[]> {
    return ApiMock.getTimeEntriesByIds(ids);
  }

  static createNewEntry(predefinedTimeEntry?: ITimeEntryPrimitive): Promise<ITimeEntry> {
    return ApiMock.createNewEntry(predefinedTimeEntry);
  }

  static getUserTimeEntries(): Promise<ITimeEntry[]> {
    return ApiMock.getUserTimeEntries();
  }

  static isTimeEntryOnGoing(): Promise<boolean> {
    return ApiMock.isTimeEntryOnGoing();
  }

  static stopTimeEntry(timeEntryId: number): Promise<void> {  
    this.setUpdateFlag(true);
    return ApiMock.stopTimeEntry(timeEntryId);
  }

  static getUserStoredEntries(): Promise<ITimeEntry[]> {
    return ApiMock.getUserTimeEntries();
  }

  static getUnfinishedTimeEntry(): Promise<ITimeEntry | undefined> {
    return ApiMock.getUnfinishedTimeEntry();
  }

  static updateTimeEntry(updatedTimeEntry: Partial<ITimeEntryBareBones>): Promise<null> {
    return ApiMock.updateTimeEntry(updatedTimeEntry);
  }
}
