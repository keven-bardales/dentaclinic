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

  toString() {
    return this.date.toISOString();
  }

  toTimestamp() {
    return this.date.getTime();
  }

  toISOString() {
    return this.date.toISOString();
  }
}
