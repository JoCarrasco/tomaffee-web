import { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncTimer } from 'set-interval-async/fixed';

export class TimeCounter {
  private interval: SetIntervalAsyncTimer | undefined;
  private onRepeat: () => any;
  private onStop: () => any;

  constructor(onRepeat: () => any, onStop: () => any) {
    this.onRepeat = onRepeat;
    this.onStop = onStop;
  }

  startCounter(milliseconds: number) {
    if (!this.isActive()) {
      this.interval = setIntervalAsync(async () => {
        this.onRepeat();
      }, milliseconds);
    }
  }

  stopCounter(): void {
    if (this.interval !== undefined) {
      this.onStop();
      clearIntervalAsync(this.interval);
      this.interval = undefined;
    }
  }

  isActive(): boolean {
    return this.interval !== undefined;
  }
}
