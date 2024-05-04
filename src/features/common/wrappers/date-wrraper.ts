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
    }

    if (dateString instanceof Date) {
      this.date = dateString;
    }

    if (typeof dateString === "string") {
      this.date = new Date(dateString);
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
}
