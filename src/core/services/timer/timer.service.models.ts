import { SetIntervalAsyncTimer } from 'set-interval-async/fixed';

export type TIntervalMethod = () => Promise<any> | (() => void);
export type TTimeCoreInterval = SetIntervalAsyncTimer | undefined;

export interface IWatcherData {
  now: Date;
  onGoingEntryId?: number;
}
