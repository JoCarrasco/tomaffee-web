import { clearIntervalAsync } from 'set-interval-async/fixed';
import { setIntervalAsync } from 'set-interval-async/fixed';
import { TimerServiceConstants } from './timer.service.constants';
import { TTimeCoreInterval, TIntervalMethod } from './timer.service.models';

export class TimerCoreService {
  private static counterInterval: TTimeCoreInterval;
  private static apiWatcherInterval: TTimeCoreInterval;

  protected static startCounter(fn: TIntervalMethod) {
    this.setInterval(
      this.apiWatcherInterval,
      fn,
      TimerServiceConstants.secondPeriod,
    );
  }

  protected static stopCounter(): void {
    this.clearInterval(this.counterInterval);
  }

  protected static stopApiWatcher(): void {
    this.clearInterval(this.apiWatcherInterval);
  }

  protected static startApiWatcher(fn: TIntervalMethod): void {
    this.setInterval(
      this.apiWatcherInterval,
      fn,
      TimerServiceConstants.apiCallPeriod,
    );
  }

  private static setInterval(
    interval: TTimeCoreInterval,
    fn: TIntervalMethod,
    durationInMilliseconds: number,
  ) {
    if (interval === undefined) {
      interval = setIntervalAsync(async () => {
        await fn();
      }, durationInMilliseconds);
    }
  }

  private static clearInterval(interval: TTimeCoreInterval) {
    if (interval !== undefined) {
      clearIntervalAsync(interval);
      interval = undefined;
    }
  }
}
