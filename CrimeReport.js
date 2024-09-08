class CrimeReport {
  constructor(report) {
    this.pdid = report.pdid;
    this.incidentnum = report.incidntnum;
    this.incident_code = report.incident_code;
    this.category = report.category;
    this.description = report.descript;
    this.date = report.date;
    this.time = report.time;
    this.pddistrict = report.pddistrict;
    this.resolution = report.resolution;
    this.address = report.address;
    this.location = report.location;
  }

  get get_location() {
    return [this.location.coordinates[1], this.location.coordinates[0]];
  }

  get icon() {
    return this.resolution == "ARREST, BOOKED"
      ? L.icon({
          iconUrl: "icons/bluecircle.png",
          iconSize: [30, 30],
        })
      : this.resolution == "ARREST, CITED"
      ? L.icon({
          iconUrl: "icons/greencircle.png",
          iconSize: [30, 30],
        })
      : this.resolution == "NONE"
      ? L.icon({
          iconUrl: "icons/redcircle.png",
          iconSize: [30, 30],
        })
      : this.resolution == "UNFOUND"
      ? L.icon({
          iconUrl: "icons/purplecircle.png",
          iconSize: [30, 30],
        })
      : this.resolution == "LOCATED"
      ? L.icon({
          iconUrl: "icons/orangecircle.png",
          iconSize: [30, 30],
        })
      : L.icon({
          iconUrl: "icons/whitecircle.png",
          iconSize: [30, 30],
        });
  }

  display_info() {
    return `
          <div>
            <p>Police Department ID: ${this.pdid}</p>
            <p>Incident Number: ${this.incidentnum}</p>
            <p>Incident Code: ${this.incident_code}</p>
            <p>Category: ${this.category}</p>
            <p>Description: ${this.description}</p>
            <p>Date: ${this.date}</p>
            <p>Time: ${this.time}</p>
            <p>Police Department District: ${this.pddistrict}</p>
            <p>Resolution: ${this.resolution}</p>
            <p>Address: ${this.address}</p>
          </div>
        `;
  }
}
