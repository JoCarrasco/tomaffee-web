import { SetIntervalAsyncTimer } from 'set-interval-async/fixed';

export type TIntervalMethod = () => Promise<any>;
export type TTimeCoreInterval = SetIntervalAsyncTimer | undefined;

export interface IWatcherData {
  now: Date;
  onGoingEntryId?: number;
}
