export class DateWrapper {
  public toString: string;
  public toTimestamp: number;
  public toLocaleString: string;
  public toLocaleDateString: string;
  public toLocaleTimeString: string;
  public toDateString: string;
  public toTimeString: string;
  public toISOString: string;
  public dateFormatter = new Intl.DateTimeFormat("es-HN", {});

  public date: Date;
  constructor(dateString: string | DateWrapper | Date) {
    this.date = new Date();
    if (dateString instanceof DateWrapper) {
      this.date = new Date(dateString.toTimestamp);
    } else if (dateString instanceof Date) {
      this.date = dateString;
    } else if (typeof dateString === "string") {
      this.date = new Date(dateString);
    } else {
      let newValue = dateString as any;
      if(newValue?.date) {
      this.date = new Date(newValue.date as any);
      }
    }

    this.toString = this.date.toString();
    this.toTimestamp = this.date.getTime();
    this.toLocaleString = this.date.toLocaleString();
    this.toLocaleDateString = this.date.toLocaleDateString();
    this.toLocaleTimeString = this.date.toLocaleTimeString();
    this.toDateString = this.date.toDateString();
    this.toTimeString = this.date.toTimeString();
    this.toISOString = this.date.toISOString();
  }

  formatDate(options: Intl.DateTimeFormatOptions) {
    const formatter = new Intl.DateTimeFormat("es-HN", options);
    return formatter.format(this.date);
  }

  isBefore(date: DateWrapper) {
    return this.date < date.date;
  }

  differenceInDays(date: DateWrapper) {
    const diffTime = Math.abs(this.date.getTime() - date.date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  toObject() {
    return {
      date: this.date,
      toString: this.toString,
      toTimestamp: this.toTimestamp,
      toLocaleString: this.toLocaleString,
      toLocaleDateString: this.toLocaleDateString,
      toLocaleTimeString: this.toLocaleTimeString,
      toDateString: this.toDateString,
      toTimeString: this.toTimeString,
      toISOString: this.toISOString,
    };
  }

  get toDataBase() {
    return this.date;
  }

  get year() {
    return this.date.getFullYear();
  }

  get month() {
    return this.date.getMonth();
  }

  get day() {
    return this.date.getDate();
  }

  get hours() {
    return this.date.getHours();
  }

  get minutes() {
    return this.date.getMinutes();
  }

  get seconds() {
    return this.date.getSeconds();
  }
}
