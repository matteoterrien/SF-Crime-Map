// Statistics of Resolutions
class ResolutionReport {
  constructor() {
    this.booked = 0;
    this.cited = 0;
    this.unresolved = 0;
    this.other = 0;
  }

  addStatistic(resolution) {
    resolution == "ARREST, BOOKED"
      ? this.booked++
      : resolution == "ARREST, CITED"
      ? this.cited++
      : resolution == "NONE"
      ? this.unresolved++
      : this.other++;
  }

  get bookedAmount() {
    return this.booked;
  }

  get citedAmount() {
    return this.cited;
  }

  get unresolvedAmount() {
    return this.unresolved;
  }

  get otherAmount() {
    return this.other;
  }

  get statistics() {
    return [
      { Booked: this.booked },
      { Cited: this.cited },
      { Unresolved: this.unresolved },
      { Other: this.other },
    ];
  }

  get total() {
    return this.booked + this.cited + this.unresolved + this.other;
  }
}
