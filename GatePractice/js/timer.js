export class Timer {
  constructor(onTick) {
    this.onTick = onTick;
    this.elapsedSec = 0;
    this.limitSec = null;
    this.intervalId = null;
  }

  start(limitSec = null) {
    this.stop();
    this.limitSec = Number.isFinite(limitSec) ? limitSec : null;
    this.intervalId = setInterval(() => {
      this.elapsedSec += 1;
      this.onTick?.(this.elapsedSec, this.getRemainingSec());
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.elapsedSec = 0;
    this.limitSec = null;
  }

  getRemainingSec() {
    if (this.limitSec == null) return null;
    return Math.max(this.limitSec - this.elapsedSec, 0);
  }

  format(sec) {
    const safe = Math.max(Number(sec || 0), 0);
    const m = Math.floor(safe / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(safe % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  }
}
