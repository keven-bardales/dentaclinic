export class DateWrapper {
  constructor(public date: Date) {
    this.date = date;
  }

  static fromString(date: string) {
    return new DateWrapper(new Date(date));
  }

  static fromTimestamp(timestamp: number) {
    return new DateWrapper(new Date(timestamp));
  }

  get toString() {
    return this.date.toISOString();
  }

  get toTimestamp() {
    return this.date.getTime();
  }

  get toLocaleString() {
    return this.date.toLocaleString();
  }

  get toLocaleDateString() {
    return this.date.toLocaleDateString();
  }

  get toLocaleTimeString() {
    return this.date.toLocaleTimeString();
  }

  get toDateString() {
    return this.date.toDateString();
  }

  get toTimeString() {
    return this.date.toTimeString();
  }

  get toISOString() {
    return this.date.toISOString();
  }
}
